import axios from "axios";
import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import type { Pet } from "../types/Pet";

const PetList = () => {
  const [allPets, setAllPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pets");
        setAllPets(res.data.pets);
      } catch (error) {
        console.error("System failed:", error);
      }
    };

    fetchAllPets();
  }, []);

  return (
    <div className="min-h-screen bg-[#EBF4E6] py-12 px-12 transition-colors duration-500">
      {/* Sayfa Başlığı - Mavi tonunla çok şık duracak! */}
      <div className="mb-16 text-center">
        <h2 className="text-5xl text-[#1581BF] uppercase tracking-tighter font-black drop-shadow-sm">
          Explore Pets
        </h2>
        <p className="text-zinc-500 mt-4 font-bold tracking-wide uppercase text-xs opacity-70">
          Check out all the paws in the neighborhood to make a new friend
        </p>
        {/* Minik bir ayraç çizgisi Snouty havası katar */}
        <div className="w-24 h-1 bg-[#1581BF] mx-auto mt-6 rounded-full opacity-20"></div>
      </div>

      {/* Kartların Dizileceği Grid Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {allPets.length > 0 ? (
          allPets.map((pet) => (
            <div
              key={pet._id}
              className="hover:scale-[1.02] transition-transform duration-300"
            >
              <PetCard pet={pet} />
            </div>
          ))
        ) : (
          /* Patiler yüklenirken veya boşken gözükecek tatlı bir mesaj */
          <div className="col-span-full text-center py-20">
            <p className="text-zinc-400 font-medium italic">
              There are no paw prints around here yet... 🐾
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetList;
