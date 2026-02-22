import { useState, useEffect } from "react";
import axios from "axios";
import AboutSection from "../components/Profile/AboutSection";
import UpdateProfileModal from "../components/Profile/UpdateProfileModal";
import type { User } from "../types/User"; // 💎 Merkezi vizyoner tip

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab] = useState("about");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to see your profile.");
          setLoading(false);
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        // 🩺 Backend'deki o pırlanta rotaya sinyal gönderiyoruz
        const userRes = await axios.get(
          "http://localhost:8800/api/user/profile",
          config,
        );

        setUser(userRes.data.result);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch profile.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F9FAFB]">
        <h2 className="text-xl font-black italic text-zinc-400 animate-pulse">
          Loading... 🐾
        </h2>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F9FAFB]">
        <h2 className="text-red-500 font-mono uppercase tracking-widest bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm">
          {error}
        </h2>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans bg-[#F9FAFB] min-h-screen">
      <div className="transition-all duration-300">
        {activeTab === "about" && (
          <AboutSection
            user={user}
            // 🩺 setUser'ı buradan sildik çünkü modal zaten bu işi pırlanta gibi yapıyor
            onEditClick={() => setIsModalOpen(true)}
          />
        )}
      </div>

      {/* 🛡️ Modal Operasyonu: Sadece ihtiyaç anında paramedic hızıyla açılır */}
      {isModalOpen && user && (
        <UpdateProfileModal
          user={user}
          onCancel={() => setIsModalOpen(false)}
          onSuccess={(updatedUser) => {
            setUser(updatedUser); // 💎 Sayfadaki veriyi mermer gibi güncelliyoruz
            setIsModalOpen(false); // Modalı pırlanta gibi kapatıyoruz
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;
