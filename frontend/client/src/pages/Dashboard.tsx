import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Senin pırlanta sayfaların ve bileşenlerin
import ProfilePage from "./ProfilePage";
import PetList from "./PetList";
import CaregivingList from "./CaregivingList";
import MyPets from "../components/MyPets";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile"); // Başlangıç rotası mermer gibi profil olsun

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out, bestie? 🐾")) {
      logout();
      navigate("/"); // Ana sayfaya paramedic hızıyla fırlatıyoruz
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* 🏗️ SIDEBAR: Kullanıcı Navigasyon Hattı */}
      <aside className="w-72 bg-white border-r border-zinc-100 p-8 flex flex-col justify-between shadow-sm">
        <div>
          {/* Kullanıcı Kimlik Alanı */}
          <div className="mb-10 flex items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="w-12 h-12 bg-[#63783A] rounded-xl flex items-center justify-center text-white font-black shadow-inner">
              {currentUser?.username?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                Logged in as,
              </p>
              <h3 className="text-sm font-bold text-[#4A2C21] truncate">
                {currentUser?.username || "Member"}
              </h3>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {" "}
            {/* Gap'i 4'e çıkardık, butonlar arası mesafe açıldı */}
            <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] mb-4 px-4">
              User Hub
            </h4>
            {[
              { id: "profile", icon: "👤", label: "My Profile" },
              { id: "my-pets", icon: "🐾", label: "My Besties" },
              { id: "sitters", icon: "🤝", label: "Find Sitters" }, // İkonları ve metni ayırıyoruz
              { id: "pets", icon: "🐕", label: "Explore Pets" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
        group flex items-center gap-4 px-6 py-5 rounded-3xl font-bold text-[11px] uppercase tracking-[0.15em] transition-all duration-300
        ${
          activeTab === item.id
            ? "bg-[#63783A] text-white shadow-xl shadow-green-900/10 translate-x-2" // Seçiliyken sağa hafif kayma vizyonu
            : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 hover:translate-x-1" // Hover'da pırlanta gibi hafif hareket
        }
      `}
              >
                {/* İkon Alanı: Sabit genişlik veriyoruz ki metinler mermer gibi hizalansın */}
                <span
                  className={`text-xl transition-transform group-hover:scale-110`}
                >
                  {item.icon}
                </span>

                {/* Metin Alanı */}
                <span className="whitespace-nowrap italic tracking-tighter text-sm">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* 🚀 CONTENT AREA: Pırlanta Sahnesi */}
      <main className="flex-1 overflow-y-auto">
        <header className="px-10 py-8 bg-white/60 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center border-b border-zinc-100">
          <h2 className="text-xl font-black text-[#4A2C21] uppercase italic tracking-tighter">
            {activeTab === "profile" && "Profile Overview"}
            {activeTab === "my-pets" && "My Fur Squad"}
            {activeTab === "sitters" && "Trusted Sitters"}
            {activeTab === "pets" && "Global Pet Feed"}
          </h2>
          <div className="px-4 py-1.5 bg-[#63783A]/10 rounded-full border border-[#63783A]/20">
            <p className="text-[10px] font-black text-[#63783A] uppercase tracking-widest">
              Dashboard Active 🩺
            </p>
          </div>
        </header>

        <section className="p-10 ">
          {/* App.tsx dosyasındaki pırlanta sayfaların nakli */}
          {activeTab === "profile" && <ProfilePage />}
          {activeTab === "my-pets" && <MyPets />}
          {activeTab === "sitters" && <CaregivingList />}
          {activeTab === "pets" && <PetList />}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
