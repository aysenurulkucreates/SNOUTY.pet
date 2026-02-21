import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AddPetProps {
  onSuccess: () => void;
}

const AddPet = ({ onSuccess }: AddPetProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    imageUrl: "",
    age: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8800/api/pets", formData, {
        headers: { Authorization: "Bearer " + token },
      });
      onSuccess();
      navigate("/profile");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Eğer bu bir Axios hatasıysa mesajı çek
        setError(err.response?.data?.message || "Failed creating");
      } else {
        // Değilse genel bir hata ver
        setError("An unexpected error occured.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md p-10 border-t-4 border-t-orange-500 border-x border-b border-zinc-100 shadow-xl bg-white rounded-sm">
        <h2 className="text-3xl font-serif text-center mb-8 text-zinc-800">
          Add New
          <span className="font-bold border-b-4 border-orange-400">Pet</span>
        </h2>

        {error && (
          <p className="text-red-500 text-[10px] font-mono mb-4 text-center uppercase tracking-widest">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Pet Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
              placeholder="Luna"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Pet Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border-b border-zinc-200 py-2 bg-transparent focus:outline-none focus:border-black font-mono text-sm appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="bird">Bird</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Pet Image URL
            </label>
            <input
              name="imageUrl"
              type="text"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
              placeholder="https://images.unsplash.com/photo-..."
              required
            />
            {formData.imageUrl && (
              <div className="mt-4 w-full h-40 border border-zinc-100 rounded-sm overflow-hidden bg-zinc-50 flex items-center justify-center">
                <img
                  src={formData.imageUrl}
                  alt="Pet preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/150?text=Invalid+URL")
                  }
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Pet Age
            </label>
            <input
              name="age"
              type="number"
              min="0"
              max="30"
              value={formData.age}
              onChange={handleChange}
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
              placeholder="3"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Pet Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
              placeholder="Luna likes playing."
              required
            />
          </div>
          <button
            disabled={loading}
            className="mt-4 py-4 bg-[#E67E22] text-black font-mono font-bold uppercase tracking-widest text-[11px] hover:opacity-90 disabled:bg-zinc-300"
          >
            {loading ? "System Loading..." : "Create a pet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
