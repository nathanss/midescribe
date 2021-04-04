import { Select } from "antd";
import { Percussion } from "@midescribe/common";

export default function DrumLoop({ value, onChange }) {
  return (
    <Select mode="multiple" value={value} onChange={onChange}>
      {Object.keys(Percussion).map((percussion) => (
        <Select.Option key={percussion}>
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {percussion}
          </span>
        </Select.Option>
      ))}
    </Select>
  );
}
