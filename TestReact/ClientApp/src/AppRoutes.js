
import { Home } from "./components/Home";
import ChildTableNew from "./components/ChildTable/ChildTableNew";
import Calculator from "./components/Calculator/Calculator";

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

];

export default AppRoutes;
