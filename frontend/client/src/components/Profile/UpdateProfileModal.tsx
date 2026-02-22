import { useState } from "react";
import axios from "axios";
import type { User } from "../../types/User";

interface UpdateProfileProps {
  user: User;
  onSuccess: (updatedUser: User) => void;
  onCancel: () => void;
}

const UpdateProfileModal = ({
  user,
  onSuccess,
  onCancel,
}: UpdateProfileProps) => {
  const availableTags = [
    "Vegan Member 🌿",
    "Cat Lover 🐾",
    "Dog Expert 🐕",
    "Volunteer 🤝",
    "Professional 🎓",
  ];

  // 💎 State'in tipini mermer gibi açıkça belirtiyoruz
  const [formData, setFormData] = useState<{
    username: string;
    location: string;
    bio: string;
    profilePicture: string;
    tags: string[];
  }>({
    username: user?.username || "",
    location: user?.location || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
    tags: Array.isArray(user?.tags) ? user.tags : [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    setFormData((prev) => {
      const isExist = prev.tags.includes(tag);
      return {
        ...prev,
        tags: isExist
          ? prev.tags.filter((t: string) => t !== tag) // Varsa çıkar
          : [...prev.tags, tag], // Yoksa ekle
      };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:8800/api/user/profile`,
        formData,
        { headers: { Authorization: "Bearer " + token } },
      );
      console.log("FRONTEND'E GELEN CEVAP:", response.data.result);
      onSuccess(response.data.result);
      alert("Success! Your profile is updated. ✨");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || "Failed updating");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm px-6 py-10">
      <div className="w-full max-w-2xl p-10 bg-white rounded-[3.5rem] shadow-2xl border border-zinc-100 overflow-y-auto max-h-[90vh] animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#4A2C21] uppercase tracking-tighter italic">
            Edit Profile
          </h2>
          <div className="w-16 h-1 bg-amber-400 mx-auto mt-3 rounded-full opacity-40"></div>
        </div>

        {error && (
          <p className="text-red-500 text-[10px] font-black mb-6 text-center uppercase bg-red-50 p-3 rounded-xl">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-zinc-400 px-1">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="bg-zinc-50 border-b-2 border-zinc-100 p-3 focus:outline-none focus:border-[#63783A] text-sm rounded-t-xl"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black uppercase text-zinc-400 px-1">
                Location
              </label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="bg-zinc-50 border-b-2 border-zinc-100 p-3 focus:outline-none focus:border-[#63783A] text-sm rounded-t-xl"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase text-zinc-400 px-1">
              Badges (Select yours)
            </label>
            <div className="flex flex-wrap gap-2 p-4 bg-zinc-50 rounded-[2rem] border border-zinc-100">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-1.5 text-[9px] font-black uppercase rounded-full transition-all border ${
                    formData.tags.includes(tag)
                      ? "bg-[#63783A] text-white border-[#63783A]"
                      : "bg-white text-zinc-400 border-zinc-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-zinc-400 px-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="bg-zinc-50 border-b-2 border-zinc-100 p-3 focus:outline-none focus:border-[#63783A] italic text-sm rounded-t-xl resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-zinc-400 px-1">
              Profile Picture URL
            </label>
            <input
              name="profilePicture"
              type="text"
              value={formData.profilePicture}
              onChange={handleChange}
              className="bg-zinc-50 border-b-2 border-zinc-100 p-3 focus:outline-none focus:border-[#63783A] text-sm rounded-t-xl"
              placeholder="https://images.unsplash.com/photo-1740252117027-4275d3f84385?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-[#4A2C21] text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-[#63783A] transition-all active:scale-95"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 border-2 border-zinc-100 text-zinc-400 font-black uppercase text-[10px] rounded-full hover:bg-zinc-50 transition-all active:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
