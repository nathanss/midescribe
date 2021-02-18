import { Select } from "antd";
import { Instruments } from "../../musicGeneration/SongIdeaInterfaces";

const instruments = Object.keys(Instruments).filter((x) => !(parseInt(x) >= 0));

export default function Instrument(props) {
  return (
    <Select showSearch>
      {instruments.map((i) => (
        <Select.Option key={i} value={i}>
          {i}
        </Select.Option>
      ))}
    </Select>
  );
}
