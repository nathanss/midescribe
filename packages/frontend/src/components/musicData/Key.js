import { Radio } from "antd";
import { KeysArray } from "@midescribe/common";

export default function Key(props) {
  return (
    <Radio.Group value={props.value} onChange={props.onChange}>
      {KeysArray.map((s) => (
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
