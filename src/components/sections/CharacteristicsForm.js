import { Button, Col, Form, Row, Switch } from "antd";
import DeleteButton from "../DeleteButton";
import DrumPowerHand from "../../components/musicData/DrumPowerHand";
import Instrument from "../../components/musicData/Instrument";
import Key from "../../components/musicData/Key";
import NotesDuration from "../../components/musicData/NotesDuration";
import Scale from "../../components/musicData/Scale";
import Tempo from "../../components/musicData/Tempo";
import TimeSignature from "../../components/musicData/TimeSignature";
import { useState } from "react";

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
  const [characteristics, setCharacteristics] = useState({
    tempo: 120,
    scale: "major",
    key: "d",
    notesDuration: "quarter notes",
    instrument: "aa",
    timeSignature: "4:4",
    monophonic: true,
    isDrum: false,
    drumPowerHand: undefined,
    drumOpeningHit: undefined,
  });
  return (
    <Form {...layout}>
      <Form.Item label="Tempo" tooltip="TODO" {...layout}>
        <Row>
          <Col span={23}>
            <Tempo
              value={characteristics.tempo}
              onAfterChange={(value) => {
                setCharacteristics({ ...characteristics, tempo: value });
              }}
            />
          </Col>
          <DeleteButton />
        </Row>
      </Form.Item>
      <Form.Item label="Scale">
        <Row>
          <Col span={23}>
            <Scale
              value={characteristics.scale}
              onChange={(event) => {
                setCharacteristics({
                  ...characteristics,
                  scale: event.target.value,
                });
              }}
            />
          </Col>
          <DeleteButton />
        </Row>
      </Form.Item>
      <Form.Item label="Key">
        <Row>
          <Col span={23}>
            <Key
              value={characteristics.key}
              onChange={(key) => {
                setCharacteristics({ ...characteristics, key });
              }}
            />
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
        <TimeSignature
          value={characteristics.timeSignature}
          onChange={(timeSignature) => {
            setCharacteristics({ ...characteristics, timeSignature });
          }}
        />
        <DeleteButton />
      </Form.Item>
      <Form.Item label="Monophonic">
        <Switch
          checked={characteristics.monophonic}
          onChange={(monophonic) => {
            setCharacteristics({ ...characteristics, monophonic });
          }}
        />
        <DeleteButton />
      </Form.Item>
      <Form.Item label="Is drum beat">
        <Switch
          checked={characteristics.isDrum}
          onChange={(isDrum) => {
            setCharacteristics({ ...characteristics, isDrum });
          }}
        />
        <DeleteButton />
      </Form.Item>
      {characteristics.isDrum && (
        <Form.Item label="Drum power hand">
          <DrumPowerHand
            value={characteristics.drumPowerHand}
            onChange={(drumPowerHand) => {
              setCharacteristics({ ...characteristics, drumPowerHand });
            }}
          />
          <DeleteButton />
        </Form.Item>
      )}

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
