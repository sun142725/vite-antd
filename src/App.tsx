import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { ProLayout } from "@ant-design/pro-components";
import { layout } from "./appConfig";
import { Spin } from "antd";

import renderRoutes from './utils/renderRoutes';
import routes from './routers'; // 你的路由配置文件

const App: React.FC = () => {

  useEffect(() => {
  }, []);

  // if (!initialState) {
  //   return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: 50 }} />;
  // }

  return (
    <BrowserRouter>
      <ProLayout {...layout({ })}>
        <Routes>
          {renderRoutes(routes, {})}
        </Routes>
      </ProLayout>
    </BrowserRouter>
  );
};

export default App;
