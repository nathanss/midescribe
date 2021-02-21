import { Slider } from "antd";

export default function Tempo(props) {
  return (
    <Slider
      min={1}
      max={240}
      defaultValue={props.value}
      onAfterChange={props.onAfterChange}
    />
  );
}
