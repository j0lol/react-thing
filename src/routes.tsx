import About from "./components/About/About";
import Counter from "./components/Counter/Counter";
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
      {
        path: "counter",
        element: <Counter />,
      },
    ],
  },
];

export { routes };
