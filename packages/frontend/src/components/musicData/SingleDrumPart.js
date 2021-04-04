import { Select } from "antd";
import { Percussion } from "@midescribe/common";

export default function SingleDrumPart(props) {
  return (
    <Select showSearch value={props.value} onChange={props.onChange}>
      {Object.keys(Percussion).map((p) => (
        <Select.Option key={p} value={p}>
          <span style={{ textTransform: "capitalize" }}>{p}</span>
        </Select.Option>
      ))}
    </Select>
  );
}
