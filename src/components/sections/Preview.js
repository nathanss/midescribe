import { saveAs } from "file-saver";
import { Button, Col, Row, Form, Radio } from "antd";
import { useEffect, useState } from "react";
import "./Preview.css";
import { PlayCircleOutlined, StopOutlined } from "@ant-design/icons";
import MidiMeSlider from "../musicData/MidiMeSlider";
import { getChunks } from "./helpers";
import {
  MidiMe,
  MusicVAE,
  PianoRollSVGVisualizer,
  sequenceProtoToMidi,
  sequences,
  SoundFontPlayer,
  tf,
} from "@magenta/music/es6";

let player = new SoundFontPlayer(
  "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
);

export default function Preview({ originalSequence }) {
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
    const trainModel = async () => {
      if (!isTrained) {
        const mvae = new MusicVAE(
          "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small"
        );
        await mvae.initialize();
        const midime = new MidiMe({
          epochs: 100,
        });
        await midime.initialize();
        const quantizedMel = sequences.quantizeNoteSequence(
          originalSequence,
          4
        );
        const z = await mvae.encode(getChunks([quantizedMel]));
        await midime.train(z, async (epoch, logs) => {
          console.log(epoch);
          console.log(logs);
        });
        setIsTrained(true);
        setMidime(midime);
        setMvae(mvae);
      }
    };
    trainModel();
  });

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
      setSequence(sampleDecoded);
    }
    decode();
  }, [sliders, mvae, midime]);

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
