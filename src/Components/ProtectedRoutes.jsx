import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Navbar from "../Pages/Navbar";

const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <>
      <Navbar logout={rest.logout} />
      {element}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
