import { Button, Col, Form, Row, Switch } from "antd";
import DeleteButton from "../DeleteButton";
import DrumPowerHand from "../../components/musicData/DrumPowerHand";
import Instrument from "../../components/musicData/Instrument";
import Key from "../../components/musicData/Key";
import NotesDuration from "../../components/musicData/NotesDuration";
import Scale from "../../components/musicData/Scale";
import Tempo from "../../components/musicData/Tempo";
import TimeSignature from "../../components/musicData/TimeSignature";

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

export default function CharacteristicsForm() {
  return (
    <Form {...layout}>
      <Form.Item label="Tempo" tooltip="TODO" {...layout}>
        <Row>
          <Col span={23}>
            <Tempo />
          </Col>
          <DeleteButton />
        </Row>
      </Form.Item>
      <Form.Item label="Scale">
        <Row>
          <Col span={23}>
            <Scale />
          </Col>
          <DeleteButton />
        </Row>
      </Form.Item>
      <Form.Item label="Key">
        <Row>
          <Col span={23}>
            <Key />
          </Col>
          <DeleteButton />
        </Row>
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
      <Form.Item label="Is drum beat">
        <Switch />
        <DeleteButton />
      </Form.Item>
      <Form.Item label="Drum power hand">
        <DrumPowerHand />
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
  );
}
