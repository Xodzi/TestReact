
import FetchData from "./components/FetchData";
import { Home } from "./components/Home";
import ChildTableNew from "./components/ChildTable/ChildTableNew";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
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
