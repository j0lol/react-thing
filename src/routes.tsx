import About from "./components/About/About";
import { Home } from "./components/Home/Home";
import Root from "./components/Root/Root";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

export { routes };
