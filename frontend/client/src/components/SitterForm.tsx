import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/UseAuth";

const SitterForm = () => {
  // 1. Telsizden kullanıcıyı çekiyoruz
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePicture: "",
    username: "",
    homeEnvironment: "",
    location: "",
    bio: "",
    experience: "",
    expectedFee: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Mevcut verileri forma otomatik doldurma (Pre-fill)
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        username: currentUser.username || "",
        location: currentUser.location || "",
        profilePicture: currentUser.profilePicture || "",
      }));
    }
  }, [currentUser]); // currentUser değişirse veya yüklenirse çalışır

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token"); // Mevcut tokenı çekiyoruz

      // 1. "Ben artık bakıcıyım" damgasını vuruyoruz
      const updatedData = {
        ...formData,
        isCaregiving: true,
        expectedFee: Number(formData.expectedFee),
      };

      const res = await axios.patch(
        `http://localhost:8800/api/user/caregiving`,
        updatedData,
        {
          headers: {
            // 2. Standart 'Authorization' başlığını kullanıyoruz
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 3. KRİTİK NOKTA: Backend'den dönen güncel kullanıcıyı merkezi state'e (AuthContext) bildiriyoruz
      // Bu sayede Header'daki "Become a Sitter" butonu anında kaybolur ve profilin güncellenir.
      if (res.data.user || res.data.others) {
        const updatedUser = res.data.user || res.data.others;
        login(token!, updatedUser); // login fonksiyonunu telsiz mesajı gibi kullanıyoruz
      }

      navigate("/"); // Her şey pırlanta gibiyse ana sayfaya uçur bizi aşko
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to update sitter profile",
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7F9] px-6 py-12">
      <div className="w-full max-w-2xl p-10 bg-white shadow-2xl rounded-3xl border border-zinc-50">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-800 mb-8 text-center">
          Become a <span className="text-[#1581BF]">Sitter</span> 🐾
        </h2>

        {error && (
          <p className="bg-red-50 text-red-500 p-3 rounded-lg text-xs font-bold uppercase tracking-widest mb-6 text-center border border-red-100">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              Display Name (Username)
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="How should pet owners call you?"
              className="border-2 border-stone-100 rounded-xl p-4 focus:border-[#9BC264] outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              About Me (Bio)
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your love for animals..."
              className="border-2 border-stone-100 rounded-xl p-4 focus:border-[#9BC264] outline-none transition-all h-32"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              Experience
            </label>
            <input
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleChange}
              className="border-2 border-stone-100 rounded-xl p-4 focus:border-[#9BC264] outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              Location
            </label>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Kadıköy, İstanbul"
              className="border-2 border-stone-100 rounded-xl p-4 focus:border-[#9BC264] outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              Daily Fee ($)
            </label>
            <input
              name="expectedFee"
              type="number"
              value={formData.expectedFee}
              onChange={handleChange}
              className="border-2 border-stone-100 rounded-xl p-4 focus:border-[#9BC264] outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              Home Environment
            </label>
            <select
              name="homeEnvironment"
              value={formData.homeEnvironment}
              onChange={handleChange}
              className="border-2 border-stone-100 rounded-xl p-4 focus:border-[#9BC264] outline-none transition-all bg-white cursor-pointer font-bold text-slate-700"
              required
            >
              <option value="Apartment">Apartment 🏢</option>
              <option value="House with Garden">House with Garden 🏡</option>
              <option value="Farm">Farm 🚜</option>
              <option value="Studio">Studio 🛋️</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <button
              disabled={loading}
              className="mt-6 py-5 bg-black text-white rounded-full font-black uppercase tracking-[0.3em] text-[12px] hover:bg-slate-800 transition-all shadow-lg disabled:bg-stone-200"
            >
              {loading ? "Registering..." : "Start Caregiving 🦴"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SitterForm;
