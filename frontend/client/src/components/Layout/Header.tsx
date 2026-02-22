import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-zinc-50 border-b-2 border-zinc-200 py-6 px-12 flex items-center justify-between sticky top-0 z-50 transition-all duration-500">
      <Link to="/" className="group relative">
        <div className="flex items-center justify-center group cursor-pointer">
          <h1 className="text-5xl font-black tracking-tighter text-[#628141] uppercase drop-shadow-sm">
            SN
          </h1>
          <div className="relative mx-1 -mt-2 transition-transform group-hover:scale-110 duration-300">
            <svg
              width="55"
              height="55"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="#FF5555"
                strokeWidth="8"
                fill="none"
              />
              <mask id="cat-mask">
                <circle cx="30" cy="30" r="24" fill="white" />
              </mask>
              <g mask="url(#cat-mask)">
                <ellipse cx="30" cy="45" rx="20" ry="18" fill="#EBB446" />
                <path d="M15 35L22 25L29 35" fill="#EBB446" />
                <path d="M45 35L38 25L31 35" fill="#EBB446" />
                <circle cx="24" cy="40" r="2.5" fill="#4A2C21" />
                <circle cx="36" cy="40" r="2.5" fill="#4A2C21" />
                <ellipse cx="30" cy="44" rx="3" ry="2" fill="#C05621" />
              </g>
              <path
                d="M48 20C50 18 54 18 56 20C58 22 58 26 56 28C54 30 50 30 48 28"
                fill="#EBB446"
                stroke="#4A2C21"
                strokeWidth="2"
              />
              <path
                d="M50 22L50 26"
                stroke="#4A2C21"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M53 22L53 26"
                stroke="#4A2C21"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-[#1581BF] uppercase drop-shadow-sm">
            UTY
          </h1>
        </div>
      </Link>

      <nav className="flex gap-12 items-center">
        {location.pathname !== "/" && (
          <Link
            to="/"
            className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#2b6592] transition-all duration-300 relative group"
          >
            Home
          </Link>
        )}

        {currentUser && !currentUser.isCaregiving && (
          <Link
            to="/become-sitter"
            className="bg-[#9BC264] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Become a Sitter 🐾
          </Link>
        )}

        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-full border-2 border-[#1581BF] overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={
                  currentUser.profilePicture ||
                  "https://images.unsplash.com/photo-1740252117027-4275d3f84385?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white border border-zinc-200 shadow-2xl rounded-2xl py-4 z-[60] animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-2 border-b border-zinc-100 mb-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Welcome {currentUser.username}!
                  </p>
                </div>

                {/* 🚀 ADMIN ONLY LINK: The Secret Door */}
                {currentUser?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-3 text-sm font-black text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors border-b border-zinc-100"
                  >
                    ADMIN PANEL ⚙️
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-[#1581BF] transition-colors"
                >
                  DASHBOARD
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-[#1581BF] transition-colors"
                >
                  PROFILE
                </Link>
                <Link
                  to="/my-pets"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-[#1581BF] transition-colors"
                >
                  MY PETS
                </Link>
                <Link
                  to="/users"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-[#1581BF] transition-colors"
                >
                  USERS
                </Link>
                <Link
                  to="/pets"
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-[#1581BF] transition-colors"
                >
                  PETS
                </Link>

                <div className="border-t border-zinc-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-3 text-sm font-black text-orange-500 hover:bg-orange-50 transition-colors"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          location.pathname !== "/login" && (
            <Link
              to="/login"
              className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#2b6592] transition-all relative group"
            >
              Login
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#2b6592] group-hover:w-full transition-all duration-300"></span>
            </Link>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;
