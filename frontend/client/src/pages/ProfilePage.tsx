import { useState, useEffect } from "react";
import axios from "axios";
import AboutSection from "../components/Profile/AboutSection";
import BestiesSection from "../components/Profile/BestiesSection";

interface Iuser {
  name: string;
  email: string;
  occupation?: string;
  description?: string;
  city?: string;
}

interface Ipet {
  _id: string;
  name: string;
  imageUrl: string;
  age: string;
  breed: string;
  type: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<Iuser | null>(null);
  const [pets, setPets] = useState<Ipet[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Failed login");
          setLoading(false);
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const userRes = await axios.get(
          "http://localhost:8800/api/user/profile",
          config,
        );
        const petsRes = await axios.get(
          "http://localhost:8800/api/pets",
          config,
        );

        setUser(userRes.data.result);
        setPets(petsRes.data.pets || []);
        setLoading(false);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // Eğer bu bir Axios hatasıysa mesajı çek
          setError(err.response?.data?.message || "Failed connection.");
        } else {
          // Değilse genel bir hata ver
          setError("An unexpected error occured.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
    );
  if (error)
    return (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </h2>
    );

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans bg-[#F9FAFB] min-h-screen">
      {/* 📍 ORGANİZASYON MENÜSÜ */}
      <div className="flex gap-8 border-b border-zinc-200 mb-10 overflow-x-auto pb-1">
        {[
          { id: "about", label: "👤 About", color: "#EBB446" },
          { id: "pets", label: "🐾 My Besties", color: "#63783A" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-2 font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? `border-b-4 text-zinc-800`
                : "text-zinc-400 hover:text-zinc-600"
            }`}
            style={{
              borderColor: activeTab === tab.id ? tab.color : "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🚀 İÇERİK ALANI (Tıklandığında değişen kısım) */}
      <div className="transition-all duration-300">
        {activeTab === "about" && (
          <AboutSection user={user} setUser={setUser} />
        )}
        {activeTab === "pets" && (
          <BestiesSection pets={pets} setPets={setPets} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
