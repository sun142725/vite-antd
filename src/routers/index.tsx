import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFoundPage from "../pages/404";

const routes: RouteObject[] = [
  {
    path: "/home",
    Component: Home,
  },
  { path: "/about", Component: About },
];

export default routes;
