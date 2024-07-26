import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Signup from "./Pages/Signup";
import { isAuthenticated, logout } from "./utils/auth";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";
import ListWebhooks from "./Pages/ListWebhooks";
import ListWebhookEvents from "./Pages/ListWebhookEvents";

function App() {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated() ? <Navigate to="/dashboard" /> : <Signup />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute element={<Dashboard />} logout={logout} />
              }
            />
            <Route
              path="/list-webhooks"
              element={
                <ProtectedRoute element={<ListWebhooks />} logout={logout} />
              }
            />
            <Route
              path="/list-webhook-events"
              element={
                <ProtectedRoute
                  element={<ListWebhookEvents />}
                  logout={logout}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
