import { Select } from "antd";
import { KeysArray } from "../../musicGeneration/SongIdeaInterfaces";

export default function Key(props) {
  return (
    <Select showSearch onChange={props.onChange} value={props.value}>
      {KeysArray.map((k) => (
        <Select.Option key={k} value={k}>
          {k}
        </Select.Option>
      ))}
    </Select>
  );
}
