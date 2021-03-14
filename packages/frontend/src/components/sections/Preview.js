import { saveAs } from "file-saver";
import { Button, Col, Row, Form, Radio } from "antd";
import { useEffect, useState } from "react";
import "./Preview.css";
import { PlayCircleOutlined, StopOutlined } from "@ant-design/icons";
import MidiMeSlider from "../musicData/MidiMeSlider";
import {
  MidiMe,
  MusicVAE,
  PianoRollSVGVisualizer,
  sequenceProtoToMidi,
  SoundFontPlayer,
  tf,
} from "@magenta/music/es6";

let player = new SoundFontPlayer(
  "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
);

export default function Preview({ originalSequence, isDrum }) {
  const [playing, setPlaying] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [sequence, setSequence] = useState(originalSequence);
  const [sliders, setSliders] = useState({
    slider1: 0.5,
    slider2: 0.5,
    slider3: 0.5,
    slider4: 0.5,
  });
  const [midime, setMidime] = useState(null);
  const [mvae, setMvae] = useState(null);
  const [showTrained, setShowTrained] = useState(false);

  useEffect(() => {
    setIsTrained(false);
    setMidime(null);
    setMvae(null);
    if (originalSequence.notes.length === 0) {
      return;
    }
    const trainModel = async () => {
      const mvae = new MusicVAE(
        isDrum
          ? "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_lokl_small"
          : "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small"
      );
      await mvae.initialize();
      const midime = new MidiMe({
        epochs: 100,
      });
      await midime.initialize();
      // for some reason it works quantizing when it is melodic but breaks when isDrum
      const z = await mvae.encode([originalSequence]);
      await midime.train(z, async (epoch, logs) => {
        console.log(epoch);
        console.log(logs);
      });
      setIsTrained(true);
      setMidime(midime);
      setMvae(mvae);
    };
    trainModel();
  }, [originalSequence, isDrum]);

  useEffect(() => {
    const visualizer = new PianoRollSVGVisualizer(
      showTrained ? sequence : originalSequence,
      document.getElementById("previewSvg"),
      {
        noteRGB: "35,70,90",
        activeNoteRGB: "157, 229, 184",
        noteHeight: 10,
        pixelsPerTimeStep: 200,
        noteSpacing: 5,
      }
    );
    player.callbackObject = {
      run: (note) => visualizer.redraw(note, true),
      stop: () => {
        setPlaying(false);
      },
    };
  }, [sequence, originalSequence, showTrained]);

  useEffect(() => {
    const addMetadataToSampleDecoded = (sampleDecoded) => {
      if (!isDrum && originalSequence.notes && originalSequence.notes[0]) {
        const originalProgram = originalSequence.notes[0].program;
        sampleDecoded.notes.forEach((note) => {
          note.program = originalProgram;
        });
      }
      sampleDecoded.tempos = originalSequence.tempos;
    };
    async function decode() {
      if (!mvae || !midime) {
        return;
      }
      const zFrom4Sliders = [
        sliders.slider1,
        sliders.slider2,
        sliders.slider3,
        sliders.slider4,
      ];
      const sample = await midime.decode(tf.tensor(zFrom4Sliders, [1, 4]));
      const sampleDecoded = (await mvae.decode(sample))[0];
      addMetadataToSampleDecoded(sampleDecoded);
      setSequence(sampleDecoded);
    }
    decode();
  }, [
    sliders,
    mvae,
    midime,
    isDrum,
    originalSequence.notes,
    originalSequence.tempos,
  ]);

  function onPlayStopClick() {
    if (!playing) {
      player.start(showTrained ? sequence : originalSequence);
      setPlaying(true);
    } else {
      player.stop();
      setPlaying(false);
    }
  }

  function onExportClick() {
    saveAs(
      new File(
        [sequenceProtoToMidi(showTrained ? sequence : originalSequence)],
        "sample.mid"
      )
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {showTrained && isTrained && (
        <Form>
          <Form.Item label="Sliders">
            <Row>
              <Col span={6}>
                <MidiMeSlider
                  value={sliders.slider1}
                  onAfterChange={(value) => {
                    setSliders({ ...sliders, slider1: value });
                  }}
                />
              </Col>
              <Col span={6}>
                <MidiMeSlider
                  value={sliders.slider2}
                  onAfterChange={(value) => {
                    setSliders({ ...sliders, slider2: value });
                  }}
                />
              </Col>
              <Col span={6}>
                <MidiMeSlider
                  value={sliders.slider3}
                  onAfterChange={(value) => {
                    setSliders({ ...sliders, slider3: value });
                  }}
                />
              </Col>
              <Col span={6}>
                <MidiMeSlider
                  value={sliders.slider4}
                  onAfterChange={(value) => {
                    setSliders({ ...sliders, slider4: value });
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
      <div className="visualizer-container cream">
        <Button
          className="button-circle"
          icon={playing ? <StopOutlined /> : <PlayCircleOutlined />}
          onClick={onPlayStopClick}
        />
        <svg id="previewSvg"></svg>
      </div>
      <div>
        {!isTrained && (
          <div>
            <p>Training the model</p>
          </div>
        )}
        {isTrained && (
          <Radio.Group
            onChange={(e) => {
              setShowTrained(e.target.value);
            }}
            value={showTrained}
          >
            <Radio value={false}>Original</Radio>
            <Radio value={true}>Trained</Radio>
          </Radio.Group>
        )}
      </div>

      <Button onClick={onExportClick}>Export</Button>
    </div>
  );
}
