import { Slider } from "antd";

export default function MidiMeSlider(props) {
  return (
    <Slider
      min={-1}
      max={1}
      step={0.01}
      vertical={true}
      defaultValue={props.value}
      onAfterChange={props.onAfterChange}
      style={{ height: "100px" }}
    />
  );
}
