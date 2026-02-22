import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddPet from "../pages/AddPet";
import UpdatePetModal from "./Profile/UpdatePetModal";
import PetCard from "./PetCard";
import type { Pet } from "../types/Pet";

const MyPets = () => {
  // 1. Local states: Managing our own clinic records
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // Your secure key to the database

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 2. FETCH PROTOCOL: Axios with medical precision
  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/api/pets/my-pets",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setPets(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Diagnosis failed:",
            err.response?.data?.msg || err.message,
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMyPets();
  }, [token]);

  // --- 🚑 DISCHARGE OPERATION (DELETE) ---
  const handleDelete = async (id: string) => {
    if (!window.confirm("Do you really want to delete this pet? 🐾")) return;

    setIsProcessing(true);
    try {
      // Direct access to localStorage or better: use the token from useAuth
      await axios.delete(`http://localhost:8800/api/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Discharge failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- 🚑 TREATMENT SUCCESS (UPDATE) ---
  const handleUpdateSuccess = (updatedPet: Pet) => {
    setPets((prev) =>
      prev.map((p) => (p._id === updatedPet._id ? updatedPet : p)),
    );
    setEditingPet(null);
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black text-zinc-300 uppercase tracking-widest animate-pulse">
        Scanning for squad members... 🏥
      </div>
    );

  return (
    <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-zinc-100 animate-fadeIn">
      {editingPet ? (
        <UpdatePetModal
          pet={editingPet}
          onCancel={() => setEditingPet(null)}
          onSuccess={handleUpdateSuccess}
        />
      ) : showAddForm ? (
        <div className="animate-slideUp">
          {/* Başlık ve Buton Alanı: 'relative' ekleyerek butonu köşeye, başlığı merkeze alıyoruz */}
          <div className="relative flex flex-col items-center text-center mb-10 border-b border-zinc-50 pb-8">
            {/* Geri Dön Butonu: 'absolute' ile sağ köşeye sabitliyoruz ki başlığı itmesin */}
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute right-0 top-0 text-zinc-400 font-bold uppercase text-[10px] tracking-widest hover:text-rose-400 transition-colors border border-zinc-100 px-4 py-2 rounded-full"
            >
              [ Cancel / Go Back ]
            </button>

            {/* Ortalanmış Başlık Grubu */}
            <div className="mt-4">
              <h2 className="text-4xl font-black text-[#4A2C21] tracking-tighter uppercase italic">
                Register New Bestie
              </h2>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-2">
                Adding a new member to the squad
              </p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-6 md:p-10 rounded-[2rem] border-2 border-dashed border-zinc-200">
            <AddPet onSuccess={() => setShowAddForm(false)} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-zinc-50 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">🐾</span>
              <div>
                <h2 className="text-3xl font-black text-[#4A2C21] tracking-tighter uppercase italic">
                  My Besties
                </h2>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  The elite squad of fur friends
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="group flex items-center gap-2 bg-[#63783A] hover:bg-[#4d5d2d] text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-md active:scale-95"
            >
              <span className="text-lg group-hover:rotate-90 transition-transform inline-block">
                +
              </span>
              Add New Bestie
            </button>
          </div>

          {isProcessing && (
            <p className="text-center font-mono text-xs text-amber-500 mb-4 animate-pulse">
              Processing... 🏥
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {pets.length > 0 ? (
              pets.map((pet) => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  onDelete={() => handleDelete(pet._id)}
                  onUpdate={() => setEditingPet(pet)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-4 border-dashed border-zinc-50 rounded-[2rem] flex flex-col items-center gap-4">
                <p className="text-zinc-300 font-mono text-sm uppercase tracking-widest">
                  Your squad is empty...
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-[#63783A] font-black uppercase text-xs underline decoration-2 underline-offset-4"
                >
                  Register your first bestie now
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default MyPets;
