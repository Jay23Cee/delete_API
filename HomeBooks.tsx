import { Layout, Breadcrumb } from "antd";
import "../App.css";

import BookTable from "./BookTable";

const { Content } = Layout;

const Homepage = () => (
  <Content style={{ padding: "0 50px" }}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Library</Breadcrumb.Item>
      <Breadcrumb.Item>Table</Breadcrumb.Item>
    </Breadcrumb>
    <div className="site-layout-content">
      <BookTable />
    </div>
  </Content>
);

export default Homepage;
