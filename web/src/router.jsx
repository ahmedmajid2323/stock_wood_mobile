import {createBrowserRouter} from "react-router-dom";
import Login from "./Login";
import Home from "./home/home";

const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/> ,
    },
    {
      path: "/home/:admin_id",
      element: <Home/> ,
    }
  ]);
  export default router ;