import { InputNumber } from "antd";

export default function TimeSignature() {
  return (
    <div>
      <InputNumber min={1} max={32} defaultValue={4}></InputNumber>
      <InputNumber min={4} max={32} defaultValue={4}></InputNumber>
    </div>
  );
}
