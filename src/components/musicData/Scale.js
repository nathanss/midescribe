import { Radio } from "antd";

export default function Scale(props) {
  return (
    <Radio.Group value={props.value} onChange={props.onChange}>
      <Radio value={"major"}>Major</Radio>
      <Radio value={"minor"}>Minor</Radio>
    </Radio.Group>
  );
}
