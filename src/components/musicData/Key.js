import React from "react";
import { Select } from "antd";

export default function Key() {
  return (
    <Select showSearch>
      <Select.Option value="C">C</Select.Option>
      <Select.Option value="D">D</Select.Option>
      <Select.Option value="E">E</Select.Option>
      <Select.Option value="F">F</Select.Option>
      <Select.Option value="G">G</Select.Option>
      <Select.Option value="A">A</Select.Option>
      <Select.Option value="B">B</Select.Option>
    </Select>
  );
}
