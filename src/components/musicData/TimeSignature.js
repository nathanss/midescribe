import { InputNumber } from "antd";

export default function TimeSignature(props) {
  const [first, second] = props.value.split(":");
  return (
    <div>
      <InputNumber
        min={1}
        max={32}
        value={first}
        onChange={(newValue) => {
          props.onChange(newValue + ":" + second);
        }}
      ></InputNumber>
      <InputNumber
        min={4}
        max={32}
        value={second}
        onChange={(newValue) => {
          props.onChange(first + ":" + newValue);
        }}
      ></InputNumber>
    </div>
  );
}
