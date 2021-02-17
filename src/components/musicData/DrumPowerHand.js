import { Select } from "antd";

export default function DrumPowerHand(props) {
  return (
    <Select showSearch value={props.value} onChange={props.onChange}>
      <Select.Option value="hi-hat">Hi-hat</Select.Option>
      <Select.Option value="ride">Ride</Select.Option>
    </Select>
  );
}
