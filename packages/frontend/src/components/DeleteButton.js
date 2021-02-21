import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function DeleteButton() {
  return <Button type="text" icon={<CloseOutlined />}></Button>;
}
