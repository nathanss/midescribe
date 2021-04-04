import { Row, Col, Layout, Typography, Button } from "antd";
import ilustraAbout from "../../assets/images/about.png";
import ilustraAbout2 from "../../assets/images/about2.png";
import "./HowToUse.css";

const { Content } = Layout;
const { Title, Text } = Typography;

function HowToUse() {
  return (
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
              There are several characteristics that you can inform in this free
              text field, such as:
              <ul>
                <li>Piano at C major scale</li>
                <li>Drum beat at 120 bpm with eighth notes, kick and snare</li>
                <li>Pad with sixteenth notes</li>
              </ul>
              What you don't inform will be randomly picked for you! Please
              refer to the table below for more options.
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
              A sample with the characteristics you informed will be generated.
              You can press the play button to hear it. You can toggle between
              the original generated sample or variations. When you select
              "Variations", you can move the four sliders to generate small
              variations of the original sound. Sometimes the model will have no
              ideas for variations on the sounds: the more notes, the more
              chances to have variations, so try again with faster notes in this
              case!
            </Text>
            <Title level={2}>4. Export</Title>
            <Text>
              If you were able to generate a cool idea, you can press the Export
              button and export it as a MIDI file, to continue the work in your
              DAW or wherever you want.
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
  );
}

export default HowToUse;
