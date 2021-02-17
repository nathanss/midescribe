import { Select } from "antd";

import { NotesDuration as nd } from "../../musicGeneration/SongIdeaInterfaces";

const notesDurationKeys = Object.keys(nd).filter((x) => !(parseInt(x) >= 0));

export default function NotesDuration() {
  return (
    <Select showSearch>
      {notesDurationKeys.map((n) => (
        <Select.Option value={n}>{n}</Select.Option>
      ))}
    </Select>
  );
}
