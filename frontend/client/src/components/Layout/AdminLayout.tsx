import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "User Management", href: "/admin/users", icon: "👥" },
    { name: "Pet Listings", href: "/admin/pets", icon: "🐾" },
    { name: "Back to Site", href: "/", icon: "🏠" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-2xl">
        <div className="p-8 text-2xl font-bold border-b border-slate-800 tracking-tight">
          Snouty <span className="text-blue-500 font-medium">Admin</span>
        </div>

        <nav className="flex-1 mt-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-8 py-4 text-sm font-medium transition-all ${
                location.pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Admin Profile & Logout */}
        <div className="p-6 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white mr-3 border border-slate-600">
              {currentUser?.username?.charAt(0) || "A"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate w-32">
                {currentUser?.username}
              </span>
              <span className="text-xs text-slate-500">Administrator</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full py-2.5 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-10">
          <h1 className="text-lg font-bold text-slate-800">
            {navigation.find((item) => item.href === location.pathname)?.name ||
              "Management"}
          </h1>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
            System Status: <span className="text-green-500">Online</span>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="p-10 overflow-y-auto bg-slate-50 flex-1">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
