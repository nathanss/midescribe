import { Slider } from "antd";

export default function MidiMeSlider() {
  return (
    <Slider
      min={0}
      max={1}
      step={0.01}
      vertical={true}
      style={{ height: "100px" }}
    />
  );
}
