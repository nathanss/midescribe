import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function DeleteButton({ onDeleteClicked }) {
  return (
    <Button
      type="text"
      icon={<CloseOutlined />}
      onClick={onDeleteClicked}
    ></Button>
  );
}
