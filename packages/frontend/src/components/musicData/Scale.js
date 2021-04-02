import { Radio } from "antd";
import { ScaleArray } from "@midescribe/common";

export default function Scale(props) {
  return (
    <Radio.Group value={props.value} onChange={props.onChange}>
      {ScaleArray.map((s) => (
        <Radio key={s} value={s}>
          <span
            style={{
              "text-transform": "capitalize",
            }}
          >
            {s}
          </span>
        </Radio>
      ))}
    </Radio.Group>
  );
}
