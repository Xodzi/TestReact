
import FetchData from "./components/FetchData";
import { Home } from "./components/Home";
import ChildTableNew from "./components/ChildTable/ChildTableNew";
import Calculator from "./components/Calculator";

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
  },{
    path: "/calc",
    element: <Calculator />,
  },

];

export default AppRoutes;
