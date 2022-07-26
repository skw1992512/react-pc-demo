import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ConfigProvider } from "antd";

import "antd/dist/antd.min.css";
import zhCN from "antd/es/locale/zh_CN";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
