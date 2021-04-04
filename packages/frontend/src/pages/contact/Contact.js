import { Row, Col, Layout, Typography } from "antd";
import ilustraContact from "../../assets/images/contact.png";
import "./Contact.css";

const { Content } = Layout;
const { Title, Text } = Typography;

function Contact() {
  return (
    <Layout>
      <Content>
        <Row>
          <Col span={12} id="ContainerIlustra">
            <img src={ilustraContact} alt="" />
          </Col>
          <Col span={12} id="ContainerContact">
            <Title level={1}>Hi, I'm Nathan!</Title>
            <Text type="primary">
              I am a computer science student and hobyist musician: that means I
              spend most of my time in front of a computer.
              <br />
              <br />
              Why is that, you ask? Because, like most musicians from all levels
              of expertise nowadays, I have been relying on computers to aid me
              in music creation. This help comes in many forms, like virtual
              instruments, or recording software. It's all quite new, really,
              and we are still figuring it out.
              <br />
              <br />I hope you like this small experiment. May it inspire you
              into creating something that perhaps you wouldn't have thought by
              yourself, or even lead you out of a block. As a musician, even
              with all the technology in the world, you are still at the
              steering wheel. This is just another tool.
              <br />
              <br /> Glory to mankind.
            </Text>
            <p />
            <hr />
            <p />
            <Text type="secondary">C O N T A C T</Text>
            <br />
            <p />
            <Text type="primary" className="textstyle">
              <strong>E-mail:</strong> nsschneider1@gmail.com
            </Text>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Contact;
