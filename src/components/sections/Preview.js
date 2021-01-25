import { saveAs } from "file-saver";
import { Button, Col, Row, Form } from "antd";
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
} from "@magenta/music/es6";

let visualizer, player;

const someSequence = {
  //loaded from midi file
  ticksPerQuarter: 480,
  timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }],
  tempos: [{ time: 0, qpm: 120 }],
  notes: [
    {
      pitch: 72,
      velocity: 102,
      startTime: 0,
      endTime: 0.125,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 74,
      velocity: 102,
      startTime: 0.125,
      endTime: 0.25,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 76,
      velocity: 102,
      startTime: 0.25,
      endTime: 0.375,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 77,
      velocity: 102,
      startTime: 0.375,
      endTime: 0.5,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 79,
      velocity: 102,
      startTime: 0.5,
      endTime: 0.625,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 81,
      velocity: 102,
      startTime: 0.625,
      endTime: 0.75,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 83,
      velocity: 102,
      startTime: 0.75,
      endTime: 0.875,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
    {
      pitch: 84,
      velocity: 102,
      startTime: 0.875,
      endTime: 1,
      instrument: 0,
      // program: -1,
      isDrum: false,
    },
  ],
  totalTime: 1,
  sourceInfo: { encodingType: "MIDI", parser: "TONEJS_MIDI_CONVERT" },
};

export default function Preview() {
  function onPlayClick() {
    player.start(someSequence);
  }

  function onExportClick() {
    saveAs(new File([sequenceProtoToMidi(someSequence)], "sample.mid"));
  }

  async function onTrainClick() {
    const url =
      "https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small";
    const mvae = new MusicVAE(url);

    await mvae.initialize();
    const midime = new MidiMe({
      epochs: 100,
    });
    await midime.initialize();
    const quantizedMel = sequences.quantizeNoteSequence(someSequence, 4);
    const z = await mvae.encode(getChunks([quantizedMel]));
    midime.train(z, async (epoch, logs) => {
      console.log(epoch);
      console.log(logs);
    });
  }

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    visualizer = new PianoRollSVGVisualizer(
      someSequence,
      document.getElementById("previewSvg"),
      {
        noteRGB: "35,70,90",
        activeNoteRGB: "157, 229, 184",
        noteHeight: 5,
      }
    );
    player = new SoundFontPlayer(
      "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
    );
  });

  return (
    <div style={{ position: "relative" }}>
      <Form>
        <Form.Item label="Sliders">
          <Row>
            <Col span={6}>
              <MidiMeSlider />
            </Col>
            <Col span={6}>
              <MidiMeSlider />
            </Col>
            <Col span={6}>
              <MidiMeSlider />
            </Col>
            <Col span={6}>
              <MidiMeSlider />
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <div className="visualizer-container cream">
        <Button
          className="button-circle"
          icon={playing ? <StopOutlined /> : <PlayCircleOutlined />}
          onClick={onPlayClick}
        />
        <svg id="previewSvg"></svg>
      </div>
      <Button onClick={onTrainClick}>Train</Button>
      <Button onClick={onExportClick}>Export</Button>
    </div>
  );
}
