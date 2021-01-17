import { Button, Form, Input, Switch } from "antd";
import React, { useState } from "react";
import DeleteButton from "../../components/DeleteButton";
import Instrument from "../../components/musicData/Instrument";
import Key from "../../components/musicData/Key";
import NotesDuration from "../../components/musicData/NotesDuration";
import Scale from "../../components/musicData/Scale";
import Tempo from "../../components/musicData/Tempo";
import TimeSignature from "../../components/musicData/TimeSignature";
import "./Home.css";

function Home() {
  const [showExtractedData, setShowExtractedData] = useState(false);
  function onFinish() {
    setShowExtractedData(true);
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const submitLayout = {
    wrapperCol: {
      offset: 4,
    },
  };

  const addFieldLayout = {
    wrapperCol: {
      offset: 4,
      span: 12,
    },
  };

  return (
    <>
      <div className="site-layout-content">
        <h2>Title</h2>
        <Form {...layout} onFinish={onFinish}>
          <Form.Item
            label="Song description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {showExtractedData && (
        <div className="site-layout-content">
          <h2>Here's what was recognized from your description</h2>
          <Form {...layout}>
            <Form.Item label="Tempo" tooltip="TODO">
              <Tempo />
              <DeleteButton />
            </Form.Item>
            <Form.Item label="Scale">
              <Scale />
              <DeleteButton />
            </Form.Item>
            <Form.Item label="Key">
              <Key />
              <DeleteButton />
            </Form.Item>
            <Form.Item label="Notes duration">
              <NotesDuration />
              <DeleteButton />
            </Form.Item>
            <Form.Item label="Instrument">
              <Instrument />
              <DeleteButton />
            </Form.Item>
            <Form.Item label="Time signature">
              <TimeSignature />
              <DeleteButton />
            </Form.Item>
            <Form.Item label="Monophonic">
              <Switch />
              <DeleteButton />
            </Form.Item>
            <Form.Item {...addFieldLayout}>
              <Button type="dashed" block>
                Add field
              </Button>
            </Form.Item>
            <Form.Item {...submitLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

export default Home;
