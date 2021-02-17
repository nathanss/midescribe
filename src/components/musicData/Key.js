import { Select } from "antd";

export default function Key(props) {
  return (
    <Select showSearch onChange={props.onChange} value={props.value}>
      <Select.Option value="c">C</Select.Option>
      <Select.Option value="d">D</Select.Option>
      <Select.Option value="e">E</Select.Option>
      <Select.Option value="f">F</Select.Option>
      <Select.Option value="g">G</Select.Option>
      <Select.Option value="a">A</Select.Option>
      <Select.Option value="b">B</Select.Option>
    </Select>
  );
}
