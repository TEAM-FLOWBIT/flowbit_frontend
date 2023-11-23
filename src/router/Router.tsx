import { createBrowserRouter } from "react-router-dom";
import Predict from "../pages/predict/Predict";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/signUp";
import Community from "../pages/community/Community";

const router = createBrowserRouter([
  { path: "/", element: <Predict /> },
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/community", element: <Community /> },
]);

export default router;
