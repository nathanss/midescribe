import { Select } from "antd";
import { Instruments } from "@midescribe/common";

const instruments = Object.keys(Instruments).filter((x) => !(parseInt(x) >= 0));

export default function Instrument(props) {
  return (
    <Select showSearch value={props.value} onChange={props.onChange}>
      {instruments.map((i) => (
        <Select.Option key={i} value={i}>
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {i}
          </span>
        </Select.Option>
      ))}
    </Select>
  );
}
