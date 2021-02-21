import { Radio } from "antd";
import { Scale as scale } from "../../musicGeneration/SongIdeaInterfaces";

const scaleList = Object.keys(scale).filter((x) => !(parseInt(x) >= 0));

export default function Scale(props) {
  return (
    <Radio.Group value={props.value} onChange={props.onChange}>
      {scaleList.map((s) => (
        <Radio key={s} value={s}>
          {s}
        </Radio>
      ))}
    </Radio.Group>
  );
}
