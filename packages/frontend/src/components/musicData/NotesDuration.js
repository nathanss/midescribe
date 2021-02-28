import { Select } from "antd";

import { NotesDuration as nd } from "@midescribe/common";

const notesDurationKeys = Object.keys(nd).filter((x) => !(parseInt(x) >= 0));

export default function NotesDuration() {
  return (
    <Select showSearch>
      {notesDurationKeys.map((n) => (
        <Select.Option key={n} value={n}>
          {n}
        </Select.Option>
      ))}
    </Select>
  );
}
