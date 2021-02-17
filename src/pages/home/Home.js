import { Button, Form, Input } from "antd";
import { useState } from "react";
import CharacteristicsForm from "../../components/sections/CharacteristicsForm";
import Preview from "../../components/sections/Preview";
import "./Home.css";

import { Sequence } from "../../constants/Sequences";
import { SongDescriptorNoteSequenceGenerator } from "../../musicGeneration/SongDescriptorNoteSequenceGenerator";
import { NoteSequence } from "@magenta/music/es6";

function Home() {
  const [showExtractedData, setShowExtractedData] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  function onFinish() {
    setShowExtractedData(true);
  }

  const [sequence, setSequence] = useState(Sequence);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const onDescriptionSubmit = (description) => {
    const generator = new SongDescriptorNoteSequenceGenerator(
      description,
      NoteSequence.create
    );
    const sequence = generator.generateNoteSequence();
    setSequence(sequence);
  };

  return (
    //TODO perhaps create a component to render component + delete button with col and row
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
          <CharacteristicsForm onDescriptionSubmit={onDescriptionSubmit} />
        </div>
      )}
      {showPreview && (
        <div className="site-layout-content">
          <h2>Preview</h2>
          <Preview originalSequence={sequence} />
        </div>
      )}
    </>
  );
}

export default Home;
