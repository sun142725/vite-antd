import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
// import NotFoundPage from "../pages/404";
import CompressAudio from "../pages/ffmpeg/CompressAudio"

const routes: RouteObject[] = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "home",
    Component: Home,
  },
  { path: "about", Component: About },
  { path: "compress-audio", Component: CompressAudio },
];

export default routes;
