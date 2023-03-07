import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { ChildTable } from "./components/ChildTable";
import ChildTableNew from "./components/ChildTableNew";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/children",
    element: <ChildTableNew />,
  },
];

export default AppRoutes;
