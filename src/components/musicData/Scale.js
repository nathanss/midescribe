import { Radio } from "antd";

export default function Scale() {
  return (
    <Radio.Group>
      <Radio value={1}>Major</Radio>
      <Radio value={2}>Minor</Radio>
    </Radio.Group>
  );
}
