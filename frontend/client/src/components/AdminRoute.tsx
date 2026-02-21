import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { currentUser } = useAuth();

  // 1. Check if the user is logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the user has admin privileges
  if (!currentUser.isAdmin) {
    return <Navigate to="/" replace />; // Redirect non-admins to home
  }

  // 3. Authorized! Let them in
  return <Outlet />;
};

export default AdminRoute;
