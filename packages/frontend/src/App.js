import "antd/dist/antd.css";
import "./App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import HowToUse from "./pages/howtouse/HowToUse";
import Contact from "./pages/contact/Contact";
import Logo from "./assets/images/Logo.png";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header className="header">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["home"]}>
            <img src={Logo} alt="" className="logo_nav" />
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="howtouse">
              <Link to="/howtouse">How to use</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Route exact path="/" component={Home} />
          <Route exact path="/howtouse" component={HowToUse} />
          <Route exact path="/contact" component={Contact} />
        </Content>
        {
          <Footer style={{ textAlign: "center" }} className="FooterStyle">
            Footer
          </Footer>
        }
      </Layout>
    </BrowserRouter>
  );
}

export default App;
