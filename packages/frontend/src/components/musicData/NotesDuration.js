import { Select } from "antd";

import { NotesDuration as nd } from "@midescribe/common";

const notesDurationKeys = Object.keys(nd).filter((x) => !(parseInt(x) >= 0));

export default function NotesDuration(props) {
  return (
    <Select showSearch value={props.value} onChange={props.onChange}>
      {notesDurationKeys.map((n) => (
        <Select.Option key={n} value={n}>
          <span style={{ textTransform: "capitalize" }}>{n}</span>
        </Select.Option>
      ))}
    </Select>
  );
}
