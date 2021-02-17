import { Select } from "antd";
import { Keys } from "../../musicGeneration/SongIdeaInterfaces";

const keys = Object.keys(Keys).filter((x) => !(parseInt(x) >= 0));

export default function Key(props) {
  return (
    <Select showSearch onChange={props.onChange} value={props.value}>
      {keys.map((k) => (
        <Select.Option value={k}>{k}</Select.Option>
      ))}
    </Select>
  );
}
