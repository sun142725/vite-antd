import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProLayout } from "@ant-design/pro-components";
import { getInitialState, layout } from "./appConfig";
import { Spin } from "antd";
import Home from "./pages/Home";
import About from "./pages/About";

const App: React.FC = () => {
  const [initialState, setInitialState] = useState<any>(null);

  useEffect(() => {
    getInitialState().then((state) => {
      setInitialState(state);
    });
  }, []);

  if (!initialState) {
    return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: 50 }} />;
  }

  return (
    <BrowserRouter>
      <ProLayout {...layout({ initialState, setInitialState })}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ProLayout>
    </BrowserRouter>
  );
};

export default App;
