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
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Quisque ultricies mollis efficitur. Suspendisse at erat
              bibendum, sollicitudin tellus et, volutpat ipsum. Nullam
              consectetur felis.
            </Text>
            <p />
            <hr />
            <p />
            <Text type="secondary">C O N T A C T</Text>
            <br />
            <p />
            <Text type="primary" className="textstyle">
              <strong>E-mail:</strong> email@gmai.com
            </Text>
            <br />
            <p />
            <Text type="primary" className="textstyle">
              <strong>Telephone</strong> (51) 99999-9999
            </Text>
            <br />
            <p />
            <Text type="primary" className="textstyle">
              <strong>Address:</strong>
            </Text>
            <br />
            <iframe
              width="520"
              title="location-google-maps"
              height="209"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=520&amp;height=209&amp;hl=en&amp;q=Rua%20Felipe%20dos%20Santos,%20padre%20reus%20S%C3%A3o%20Leopoldo+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
            <script
              type="text/javascript"
              src="https://embedmaps.com/google-maps-authorization/script.js?id=d6cf1ee5588e4479d4055023c35ee9ec1c955e3a"
            ></script>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Contact;
