import { Button, Col, Form, Row, Switch } from "antd";
import DeleteButton from "../DeleteButton";
import DrumPowerHand from "../musicData/DrumPowerHand";
import Instrument from "../musicData/Instrument";
import Key from "../musicData/Key";
import NotesDuration from "../musicData/NotesDuration";
import Scale from "../musicData/Scale";
import Tempo from "../musicData/Tempo";
import TimeSignature from "../musicData/TimeSignature";
import { useState } from "react";
import {
  Instruments,
  SongIdeaEntryPoint,
} from "../../musicGeneration/SongIdeaInterfaces";

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

export default function CharacteristicsForm(props: any) {
  const [characteristics, setCharacteristics] = useState<SongIdeaEntryPoint>({
    tempo: "120",
    scale: "major",
    key: "d",
    notesDuration: "quarter notes",
    instrument: "piano",
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
              onAfterChange={(tempo: any) => {
                setCharacteristics({ ...characteristics, tempo });
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
              onChange={(event: any) => {
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
              onChange={(key: any) => {
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
        <Instrument values={Instruments} />
        <DeleteButton />
      </Form.Item>
      <Form.Item label="Time signature">
        <TimeSignature
          value={characteristics.timeSignature}
          onChange={(timeSignature: any) => {
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
            onChange={(drumPowerHand: any) => {
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
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            props.onDescriptionSubmit(characteristics);
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
