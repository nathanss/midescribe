import { Select } from "antd";

export default function DrumPowerHand() {
  return (
    <Select showSearch>
      <Select.Option value="hi-hat">Hi-hat</Select.Option>
      <Select.Option value="ride">Ride</Select.Option>
    </Select>
  );
}
