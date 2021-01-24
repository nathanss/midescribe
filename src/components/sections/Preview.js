import {
  PianoRollSVGVisualizer,
  sequenceProtoToMidi,
  SoundFontPlayer,
} from "@magenta/music";
import { saveAs } from "file-saver";
import { Button, Col, Row, Form } from "antd";
import { useEffect, useState } from "react";
import "./Preview.css";
import { PlayCircleOutlined, StopOutlined } from "@ant-design/icons";
import MidiMeSlider from "../musicData/MidiMeSlider";

let visualizer, player;

const someSequence = {
  tempos: [{ qpm: 120 }],
  notes: [
    { pitch: 73, quantizedStartStep: "0", quantizedEndStep: "6" },
    { pitch: 68, quantizedStartStep: "6", quantizedEndStep: "10" },
    { pitch: 59, quantizedStartStep: "14", quantizedEndStep: "16" },
    { pitch: 61, quantizedStartStep: "16", quantizedEndStep: "22" },
    { pitch: 59, quantizedStartStep: "22", quantizedEndStep: "26" },
  ],
  quantizationInfo: { stepsPerQuarter: 4 },
  totalQuantizedSteps: "32",
};

export default function Preview() {
  function onPlayClick() {
    player.start(someSequence);
  }

  function onExportClick() {
    saveAs(new File([sequenceProtoToMidi(someSequence)], "sample.mid"));
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
      <Button type="primary" onClick={onExportClick}>
        Export
      </Button>
    </div>
  );
}
