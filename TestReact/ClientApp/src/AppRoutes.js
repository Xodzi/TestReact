
import { Home } from "./components/Home";
import ChildTableNew from "./components/ChildTable/ChildTableNew";
import Calculator from "./components/Calculator/Calculator";
import Table from "./components/CollapsibleTable";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/children",
    element: <ChildTableNew />,
  },{
    path: "/calc",
    element: <Calculator />,
  },
  {
    path: "/fetch-data",
    element: <Table />,
  },

];

export default AppRoutes;
