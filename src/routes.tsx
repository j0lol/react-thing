import About from "./components/About/About";
import Counter from "./components/Counter/Counter";
import FormDemo from "./components/FormDemo/FormDemo";
import { Home } from "./components/Home/Home";
import NotTwitter from "./components/NotTwitter/NotTwitter";
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
      {
        path: "form",
        element: <FormDemo />,
      },
      {
        path: "social",
        element: <NotTwitter />,
      },
    ],
  },
];

export { routes };
