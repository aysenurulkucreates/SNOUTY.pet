import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProfilePage from "./pages/ProfilePage";
import PetList from "./pages/PetList";
import ProtectedRoute from "./components/ProtectedRoutes";
import CaregivingList from "./pages/CaregivingList";
import PetDetails from "./pages/PetDetails";
import SitterDetails from "./pages/SitterDetails";
import SitterForm from "./components/SitterForm";
import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PetManagement from "./pages/admin/PetManagement";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/sitters" element={<CaregivingList />} />
          <Route path="/sitters/:id" element={<SitterDetails />} />
          <Route path="/become-sitter" element={<SitterForm />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* --- Admin Panel World (Independent - No User Header/Footer) --- */}
        <Route element={<AdminRoute />}>
          {/* Guard the entire admin section */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="pets" element={<PetManagement />} />
          </Route>
        </Route>

        {/* --- 404 Not Found --- */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
