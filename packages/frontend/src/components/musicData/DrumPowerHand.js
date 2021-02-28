import { Select } from "antd";
import { Percussion } from "../../musicGeneration/SongIdeaInterfaces";

export default function DrumPowerHand(props) {
  return (
    <Select showSearch value={props.value} onChange={props.onChange}>
      {Object.keys(Percussion).map((p) => (
        <Select.Option key={p} value={p}>
          {p}
        </Select.Option>
      ))}
    </Select>
  );
}