import "antd/dist/antd.css";
import "./App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter, Link, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import HowToUse from "./pages/howtouse/HowToUse";
import Contact from "./pages/contact/Contact";
import Logo from "./assets/images/Logo.png";

const { Header, Content, Footer } = Layout;

function App({location}) {
  return (
    <BrowserRouter>
      <Layout>
        <Header className="header">
          <Menu
            theme="light"
            mode="horizontal"
            className="menuItem"
            defaultSelectedKeys={[location]}
          >
            <Menu.Item key="home_img" id="logo_nav">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </Menu.Item>
            <Menu.Item key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/howtouse">
              <Link to="/howtouse">How to use</Link>
            </Menu.Item>
            <Menu.Item key="/contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Route exact path="/" component={Home} />
          <Route exact path="/howtouse" component={HowToUse} />
          <Route exact path="/contact" component={Contact} />
        </Content>
        {/* {
          <Footer style={{ textAlign: "center" }} className="FooterStyle">
            Footer
          </Footer>
        } */}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
