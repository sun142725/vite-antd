import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ProLayout } from "@ant-design/pro-components";
import { layout } from "./appConfig";
import Home from "./pages/Home";
import NotFound from "./pages/404"
import BigLottery from "./pages/lottery/bigLottery"
import Doubble from "./pages/lottery/doubble"
import Invite from "./pages/activity/invite"
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
        <Routes>
        <Route path="/invite" element={<Invite />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/lottery/bigLottery" element={<BigLottery />}></Route>
        <Route path="/doubble" element={<Doubble />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
        <Route path="/layout" element={<ProLayout {...layout()} ><Outlet /></ProLayout>}>
            {renderRoutes(routes, {})}
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
