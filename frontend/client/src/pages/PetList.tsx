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
    /* 🏥 Ana Konteyner: Arka planı pırlanta gibi "çok açık yeşil" yaptık */
    <div className="min-h-screen bg-[#F4F9F1] py-12 px-10 transition-colors duration-500">
      {/* 🛡️ Pırlanta Beyaz Konteyner: Senior bir duruş için mermer gibi sabitlendi */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-zinc-100 min-h-[85vh]">
        {/* Sayfa Başlığı - Mavi tonunla çok şık duracak! */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl text-[#1581BF] uppercase tracking-tighter font-black drop-shadow-sm italic">
            Explore Pets
          </h2>
          <p className="text-zinc-400 mt-4 font-bold tracking-widest uppercase text-[10px] opacity-70">
            Check out all the paws in the neighborhood to make a new friend
          </p>
          {/* Snouty Mavisi Ayraç */}
          <div className="w-24 h-1 bg-[#1581BF] mx-auto mt-6 rounded-full opacity-20"></div>
        </div>

        {/* Kartların Dizileceği Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {allPets.length > 0 ? (
            allPets.map((pet) => (
              <div
                key={pet._id}
                className="hover:scale-[1.03] transition-all duration-500 h-full"
              >
                <PetCard pet={pet} />
              </div>
            ))
          ) : (
            /* Boş Durum Mesajı */
            <div className="col-span-full text-center py-32 border-2 border-dashed border-zinc-50 rounded-[3rem]">
              <p className="text-zinc-300 font-mono italic text-lg uppercase tracking-[0.2em]">
                There are no paw prints around here yet... 🐾
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetList;
