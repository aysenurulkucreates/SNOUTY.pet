import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Pet } from "../../types/Pet";

interface UpdatePetProps {
  pet: Pet;
  onSuccess: (updatedPet: Pet) => void;
  onCancel: () => void;
}

const UpdatePetModal = ({ pet, onSuccess, onCancel }: UpdatePetProps) => {
  const [formData, setFormData] = useState({
    name: pet.name,
    type: pet.type,
    imageUrl: pet.imageUrl || "",
    age: pet.age,
    description: pet.description,
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
      const response = await axios.patch(
        `http://localhost:8800/api/pets/${pet._id}`,
        formData,
        { headers: { Authorization: "Bearer " + token } },
      );

      onSuccess(response.data.result);
      alert("Success! Your bestie's record is updated. 🐾");
      navigate("/my-pets");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed updating");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 py-10">
      <div className="w-full max-w-md p-10 border-t-4 border-t-orange-500 border-x border-b border-zinc-100 shadow-xl bg-white rounded-sm animate-fadeIn">
        <h2 className="text-xl font-black text-center uppercase tracking-tighter mb-6">
          Edit Bestie ✎
        </h2>

        {error && (
          <p className="text-red-500 text-[10px] font-mono mb-4 text-center uppercase tracking-widest bg-red-50 p-2">
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
              className="border-b border-zinc-200 py-2 bg-transparent focus:outline-none focus:border-black font-mono text-sm cursor-pointer"
              required
            >
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
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-mono uppercase text-zinc-400">
              Pet Age
            </label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="border-b border-zinc-200 py-2 focus:outline-none focus:border-black font-mono text-sm"
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
              required
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="py-4 bg-[#E67E22] text-white font-mono font-bold uppercase tracking-widest text-[11px] hover:bg-orange-600 disabled:bg-zinc-300 transition-all"
            >
              {loading ? "Processing..." : "Update Bestie"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="py-4 border border-zinc-200 text-zinc-400 font-mono font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-50 transition-all"
            >
              Cancel ❌
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePetModal;
