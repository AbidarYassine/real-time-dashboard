import React from "react";
import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";




const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: "100%"
    }}
  >
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = ({ children }) => {

  return (
    <AppLayout>{children}</AppLayout>
  );
};

export default App;
