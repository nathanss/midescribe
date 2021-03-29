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
            <Title> How to use Midiscribe!</Title>
            <Title level={2}>1. Lorem Ipsum</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              euismod neque et dignissim pharetra. Etiam semper ut lacus a
              facilisis. Mauris eu nibh molestie, sollicitudin turpis dictum,
              pellentesque urna.Donec vel nulla dictum, aliquam ante id, porta
              ex. Etiam suscipit porttitor lorem, ut convallis orci sodales ut.
              Maecenas nisl lectus, maximus id eros eu, dapibus molestie ante.
              Sed posuere molestie nulla, nec luctus odio mattis ut. Cras
              feugiat eget turpis at egestas.
            </Text>
            <Title level={2}>2. Lorem Ipsum</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              euismod neque et dignissim pharetra. Etiam semper ut lacus a
              facilisis. Mauris eu nibh molestie, sollicitudin turpis dictum,
              pellentesque urna.Donec vel nulla dictum, aliquam ante id, porta
              ex.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="ContainerHTU2">
            <Title level={2}>3. Lorem Ipsum</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              euismod neque et dignissim pharetra. Etiam semper ut lacus a
              facilisis. Mauris eu nibh molestie, sollicitudin turpis dictum,
              pellentesque urna.Donec vel nulla dictum, aliquam ante id, porta
              ex. Etiam suscipit porttitor lorem, ut convallis orci sodales ut.
            </Text>
            <Title level={2}>4. Lorem Ipsum</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              euismod neque et dignissim pharetra. Etiam semper ut lacus a
              facilisis. Mauris eu nibh molestie, sollicitudin turpis dictum,
              pellentesque urna.Donec vel nulla dictum, aliquam ante id, porta
              ex. Etiam suscipit porttitor lorem, ut convallis orci sodales ut.
            </Text>
            <br />
            <Button type="primary" className="ButtonHTU">
              GETTING STARTED
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
