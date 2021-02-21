import { Select } from "antd";
import { Percussion } from "../../musicGeneration/SongIdeaInterfaces";

const percussion = Object.keys(Percussion).filter((x) => !(parseInt(x) >= 0));

export default function DrumPowerHand(props) {
  return (
    <Select showSearch value={props.value} onChange={props.onChange}>
      {percussion.map((p) => (
        <Select.Option key={p} value={p}>
          {p}
        </Select.Option>
      ))}
    </Select>
  );
}
