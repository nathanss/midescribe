import {
  Instruments,
  Percussion,
  SongIdeaPropertiesDescription,
  SongIdeaPropertiesSample,
} from "@midescribe/common";
import { Row, Col, Layout, Typography, Button, Table, List, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import ilustraAbout from "../../assets/images/about.png";
import ilustraAbout2 from "../../assets/images/about2.png";
import "./HowToUse.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const dataSource = Object.entries(SongIdeaPropertiesSample).map(
  ([key, sample]) => {
    return {
      name: key,
      sample,
      description: SongIdeaPropertiesDescription[key],
    };
  }
);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Example",
    dataIndex: "sample",
    key: "sample",
  },
];

function HowToUse() {
  const [modalInstruments, setModalInstruments] = useState(false);
  const [modalInstrumentsSearch, setModalInstrumentsSearch] = useState("");
  const [modalPercussion, setModalPercussion] = useState(false);
  const [modalPercussionSearch, setModalPercussionSearch] = useState("");
  return (
    <>
      <Modal
        visible={modalInstruments}
        footer={null}
        onCancel={() => {
          setModalInstruments(false);
        }}
      >
        <Input.Search
          style={{ marginTop: "30px" }}
          value={modalInstrumentsSearch}
          onChange={(val) => {
            setModalInstrumentsSearch(val.target.value);
          }}
        />
        <List
          size="small"
          style={{ textTransform: "capitalize" }}
          bordered
          dataSource={
            modalInstrumentsSearch === ""
              ? Object.keys(Instruments)
              : Object.keys(Instruments).filter((i) =>
                  i.includes(modalInstrumentsSearch.toLowerCase())
                )
          }
          renderItem={(item) => <List.Item key={item}>{item}</List.Item>}
        />
      </Modal>
      <Modal
        visible={modalPercussion}
        footer={null}
        onCancel={() => {
          setModalPercussion(false);
        }}
      >
        <Input.Search
          style={{ marginTop: "30px" }}
          value={modalPercussionSearch}
          onChange={(val) => {
            setModalPercussionSearch(val.target.value);
          }}
        />
        <List
          size="small"
          style={{ textTransform: "capitalize" }}
          bordered
          dataSource={
            modalPercussionSearch === ""
              ? Object.keys(Percussion)
              : Object.keys(Percussion).filter((i) =>
                  i.includes(modalPercussionSearch.toLowerCase())
                )
          }
          renderItem={(item) => <List.Item key={item}>{item}</List.Item>}
        />
      </Modal>
      <Layout>
        <Content>
          <Row>
            <Col span={12} className="ContainerHTU-ilus">
              <img src={ilustraAbout} alt="" />
            </Col>
            <Col span={12} className="ContainerHTU">
              <Title> How to use MIDescribe!</Title>
              <Text>
                MIDescribe is a tool to help you write music that uses natural
                language processing and machine learning. You can afterwards
                export your music idea as a MIDI file and take it wherever you
                want.
              </Text>
              <Title level={2}>1. Fill in your song description</Title>
              <Text>
                There are several characteristics that you can inform in this
                free text field, such as:
                <ul>
                  <li>Piano at C major scale</li>
                  <li>
                    Drum beat at 120 bpm with eighth notes, kick and snare
                  </li>
                  <li>Pad with sixteenth notes</li>
                </ul>
                What you don't inform will be randomly picked for you!
                <br />
                <br />
                Please refer to the table below for more options. The types of
                characteristics below will be recognized from your description.
                <br />
                <br />
                <Table dataSource={dataSource} columns={columns} />
                <div>
                  <Button
                    onClick={() => {
                      setModalInstruments(true);
                    }}
                  >
                    View list of available instruments
                  </Button>
                  <Button
                    onClick={() => {
                      setModalPercussion(true);
                    }}
                  >
                    View list of available percussion parts
                  </Button>
                </div>
              </Text>
              <Title level={2}>2. Review extracted information</Title>
              <Text>
                Ideally the app will have recognized what you described, but
                that's not always the case. <br />
                You can review what was extracted, add, change or delete
                information before committing to it.
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="ContainerHTU2">
              <Title level={2}>3. Hear it and tweak it</Title>
              <Text>
                A sample with the characteristics you informed will be
                generated. You can press the play button to hear it. You can
                toggle between the original generated sample or variations. When
                you select "Variations", you can move the four sliders to
                generate small variations of the original sound. Sometimes the
                model will have no ideas for variations on the sounds: the more
                notes, the more chances to have variations, so try again with
                faster notes in this case!
              </Text>
              <Title level={2}>4. Export</Title>
              <Text>
                If you were able to generate a cool idea, you can press the
                Export button and export it as a MIDI file, to continue the work
                in your DAW or wherever you want.
                <br />
                If not, you can always repeat the process and try again!
              </Text>
              <br />
              <Button type="primary" className="ButtonHTU" href="/">
                I AM READY
              </Button>
            </Col>
            <Col span={12} className="ContainerHTU-ilus">
              <img src={ilustraAbout2} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default HowToUse;
