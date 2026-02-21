import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Public pages (Home, Pets etc.) will appear here */}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
