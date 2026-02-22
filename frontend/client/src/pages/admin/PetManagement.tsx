import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// 1. Strict model definition for our furry friends
interface Pet {
  _id: string;
  name: string;
  type: string;
  ownerEmail?: string;
  createdAt: string;
}

const PetManagement = () => {
  const { token } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH: Scanning all pet records
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/api/admin/pets",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setPets(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Fetch failed:",
            err.response?.data?.msg || err.message,
          );
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchPets();
  }, [token]);

  // DELETE: Removing a record from the database
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you certain you want to delete this pet?")) return;
    try {
      await axios.delete(`http://localhost:8800/api/admin/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(pets.filter((pet) => pet._id !== id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("Action rejected: " + (err.response?.data?.msg || err.message));
      }
    }
  };

  // UPDATE: General logic to modify any pet field
  const handleUpdate = async (id: string, updatedData: Partial<Pet>) => {
    try {
      await axios.patch(
        `http://localhost:8800/api/admin/pets/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // Synchronizing local state with updated fields
      setPets(pets.map((p) => (p._id === id ? { ...p, ...updatedData } : p)));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Update failed:", err.response?.data?.msg || err.message);
      }
    }
  };

  // Logic to handle generic input before updating
  const handleEditClick = (pet: Pet) => {
    const newName = window.prompt("Update Name:", pet.name);
    const newType = window.prompt("Update Type (cat/dog/etc.):", pet.type);

    if (newName !== null || newType !== null) {
      handleUpdate(pet._id, {
        name: newName || pet.name,
        type: (newType || pet.type).toLowerCase(),
      });
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500 font-serif">
        Scanning pet database... 🐾☕
      </div>
    );

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 italic">
          🐾 Snouty Pet Management
        </h2>
        <span className="text-sm text-slate-400 font-mono italic">
          {pets.length} active records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-bold tracking-widest">
              <th className="pb-4">Pet Details</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Registered At</th>
              <th className="pb-4 text-right">Emergency Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pets.map((pet) => (
              <tr
                key={pet._id}
                className="hover:bg-slate-50 transition-all duration-300"
              >
                <td className="py-4">
                  <span className="font-bold text-slate-700">{pet.name}</span>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 rounded-md text-[10px] font-black bg-orange-100 text-orange-600 uppercase tracking-tighter">
                    {pet.type}
                  </span>
                </td>
                <td className="py-4 text-slate-400 text-[10px] font-mono italic">
                  {new Date(pet.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 text-right">
                  <div className="flex gap-4 justify-end">
                    <button
                      onClick={() => handleEditClick(pet)} // General logic call
                      className="text-emerald-500 hover:text-emerald-700 text-xs font-black uppercase tracking-widest"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-black uppercase tracking-widest"
                    >
                      Terminate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetManagement;
