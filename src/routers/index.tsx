import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
// import NotFoundPage from "../pages/404";
import CompressAudio from "../pages/ffmpeg/CompressAudio"
import Gua from "../pages/lottery/gua"
import Doubble from "../pages/lottery/doubble"
type RouteConfig = RouteObject & {
  redirect?: string;
};

const routes: RouteConfig[] = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "home",
    Component: Home,
  },
  {
    path: "lottery",
    redirect: "/layout/lottery/gua",
    children: [
      {
        path: "gua",
        Component: Gua,
      },
      {
        path: "doubble",
        Component: Doubble,
      },
    ]
  },
  { path: "about", Component: About },
  { path: "compress-audio", Component: CompressAudio },
];

export default routes;
