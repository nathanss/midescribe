import { Button, Col, Form, Row, Switch, Table } from "antd";
import DeleteButton from "../DeleteButton";
import SingleDrumPart from "../musicData/SingleDrumPart";
import Instrument from "../musicData/Instrument";
import Key from "../musicData/Key";
import NotesDuration from "../musicData/NotesDuration";
import Scale from "../musicData/Scale";
import Tempo from "../musicData/Tempo";
import DrumLoop from "../musicData/DrumLoop";
import { useEffect, useState } from "react";
import {
  DefaultValues,
  Instruments,
  SongIdeaEntryPoint,
  SongIdeaProperties,
} from "@midescribe/common";
import Modal from "antd/lib/modal/Modal";
import { SongIdeaPropertiesDescription } from "@midescribe/common";

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
  const [characteristics, setCharacteristics] = useState<SongIdeaEntryPoint>(
    props.characteristics
  );

  const [addFieldModalOpen, setAddFieldModalOpen] = useState<boolean>(false);

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([]);

  const removeCharacteristic = (name: keyof SongIdeaEntryPoint) => {
    setCharacteristics({ ...characteristics, [name]: undefined });
  };

  const getDescription = (prop: keyof SongIdeaEntryPoint) => {
    return SongIdeaPropertiesDescription[prop] || prop;
  };

  const onAddFieldModalOk = () => {
    setAddFieldModalOpen(false);
    const newCharacteristics: any = {};
    selectedRowKeys.forEach((key: keyof SongIdeaEntryPoint) => {
      newCharacteristics[key] = DefaultValues[key];
    });
    setCharacteristics({ ...characteristics, ...newCharacteristics });
  };

  useEffect(() => {
    setCharacteristics(props.characteristics);
  }, [props.characteristics]);

  const notSelectedData = SongIdeaProperties.filter(
    (prop) => characteristics[prop] === undefined
  ).map((prop) => {
    return { key: prop, property: prop, description: getDescription(prop) };
  });
  return (
    <>
      <Form {...layout}>
        {characteristics.tempo !== undefined && (
          <Form.Item
            label="Tempo"
            tooltip={getDescription("tempo")}
            {...layout}
          >
            <Row>
              <Col span={23}>
                <Tempo
                  value={characteristics.tempo}
                  onAfterChange={(tempo: any) => {
                    setCharacteristics({ ...characteristics, tempo });
                  }}
                />
              </Col>
              <DeleteButton
                onDeleteClicked={() => {
                  removeCharacteristic("tempo");
                }}
              />
            </Row>
          </Form.Item>
        )}
        {characteristics.isDrum !== undefined && (
          <Form.Item label="Is drum beat" tooltip={getDescription("isDrum")}>
            <Switch
              checked={characteristics.isDrum}
              onChange={(isDrum) => {
                setCharacteristics({ ...characteristics, isDrum });
              }}
            />
            <DeleteButton
              onDeleteClicked={() => {
                setCharacteristics({
                  ...characteristics,
                  isDrum: undefined,
                  drumPowerHand: undefined,
                });
              }}
            />
          </Form.Item>
        )}
        {characteristics.isDrum && characteristics.drumLoop !== undefined && (
          <Form.Item label="Drum loop" tooltip={getDescription("drumLoop")}>
            <DrumLoop
              value={characteristics.drumLoop}
              onChange={(drumLoop: any) => {
                setCharacteristics({ ...characteristics, drumLoop });
              }}
            />
            <DeleteButton
              onDeleteClicked={() => {
                removeCharacteristic("drumLoop");
              }}
            />
          </Form.Item>
        )}
        {characteristics.isDrum && characteristics.drumPowerHand !== undefined && (
          <Form.Item
            label="Drum power hand"
            tooltip={getDescription("drumPowerHand")}
          >
            <SingleDrumPart
              value={characteristics.drumPowerHand}
              onChange={(drumPowerHand: any) => {
                setCharacteristics({ ...characteristics, drumPowerHand });
              }}
            />
            <DeleteButton
              onDeleteClicked={() => {
                removeCharacteristic("drumPowerHand");
              }}
            />
          </Form.Item>
        )}
        {characteristics.isDrum &&
          characteristics.drumOpeningHit !== undefined && (
            <Form.Item
              label="Drum opening hit"
              tooltip={getDescription("drumOpeningHit")}
            >
              <SingleDrumPart
                value={characteristics.drumOpeningHit}
                onChange={(drumOpeningHit: any) => {
                  setCharacteristics({ ...characteristics, drumOpeningHit });
                }}
              />
              <DeleteButton
                onDeleteClicked={() => {
                  removeCharacteristic("drumOpeningHit");
                }}
              />
            </Form.Item>
          )}
        {characteristics.notesDuration !== undefined && (
          <Form.Item
            label="Notes duration"
            tooltip={getDescription("notesDuration")}
          >
            <NotesDuration
              value={characteristics.notesDuration}
              onChange={(notesDuration: any) => {
                setCharacteristics({ ...characteristics, notesDuration });
              }}
            />
            <DeleteButton
              onDeleteClicked={() => {
                removeCharacteristic("notesDuration");
              }}
            />
          </Form.Item>
        )}
        {!characteristics.isDrum && characteristics.scale !== undefined && (
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
              <DeleteButton
                onDeleteClicked={() => {
                  removeCharacteristic("scale");
                }}
              />
            </Row>
          </Form.Item>
        )}
        {!characteristics.isDrum && characteristics.key !== undefined && (
          <Form.Item label="Key">
            <Row>
              <Col span={23}>
                <Key
                  value={characteristics.key}
                  onChange={(event: any) => {
                    setCharacteristics({
                      ...characteristics,
                      key: event.target.value,
                    });
                  }}
                />
              </Col>
              <DeleteButton
                onDeleteClicked={() => {
                  removeCharacteristic("key");
                }}
              />
            </Row>
          </Form.Item>
        )}
        {!characteristics.isDrum && characteristics.instrument !== undefined && (
          <Form.Item label="Instrument" tooltip={getDescription("instrument")}>
            <Instrument
              values={Instruments}
              value={characteristics.instrument}
              onChange={(instrument: any) => {
                setCharacteristics({ ...characteristics, instrument });
              }}
            />
            <DeleteButton
              onDeleteClicked={() => {
                removeCharacteristic("instrument");
              }}
            />
          </Form.Item>
        )}
        {notSelectedData.length > 0 && (
          <Form.Item {...addFieldLayout}>
            <Button
              type="dashed"
              block
              onClick={() => {
                setAddFieldModalOpen(true);
              }}
            >
              Add fields
            </Button>
          </Form.Item>
        )}
        <Form.Item {...submitLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={submitDisabled}
            onClick={() => {
              setSubmitDisabled(true);
              setTimeout(() => {
                setSubmitDisabled(false);
              }, 5000);
              props.onDescriptionSubmit(characteristics);
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={addFieldModalOpen}
        title="Add fields"
        onCancel={() => {
          setAddFieldModalOpen(false);
        }}
        onOk={onAddFieldModalOk}
        destroyOnClose={true}
      >
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            },
          }}
          pagination={false}
          columns={[
            {
              title: "Property",
              dataIndex: "property",
            },
            {
              title: "Description",
              dataIndex: "description",
            },
          ]}
          dataSource={notSelectedData}
        ></Table>
      </Modal>
    </>
  );
}
