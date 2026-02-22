import { useState, useEffect } from "react";
import SitterCard from "../components/SitterCard";
import type { User } from "../types/User";
import axios from "axios";

const CaregivingList = () => {
  const [sitters, setSitters] = useState<User[]>([]);
  useEffect(() => {
    const fetchAllSitters = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/user/caregiving",
        );
        setSitters(res.data.sitters);
      } catch (error) {
        console.error("System failed:", error);
      }
    };

    fetchAllSitters();
  }, []);
  return (
    /* 🏥 Ana Konteyner: Arka planı pırlanta gibi "çok açık mavi" yaptık */
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-10 transition-colors duration-500">
      {/* 🛡️ Pırlanta Beyaz Zırh: My Besties sayfasındaki o vizyoner yapı */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-zinc-100 min-h-[85vh]">
        <div className="mb-16 text-center">
          {/* Başlık: Italic dokunuşuyla daha Senior bir hava kattık */}
          <h2 className="text-5xl text-[#7DA14F] uppercase tracking-tighter font-black drop-shadow-sm italic">
            Find Sitter
          </h2>
          <p className="text-stone-400 mt-4 font-bold tracking-widest uppercase text-[10px] opacity-70">
            Check out all the sitters in the neighborhood to make a new
            caregiver
          </p>
          {/* Dekoratif Çizgi */}
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-6 rounded-full opacity-50"></div>
        </div>

        {/* Kartların Dizileceği Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {sitters.length > 0 ? (
            sitters.map((sitter) => (
              <div
                key={sitter._id}
                className="hover:scale-[1.03] transition-all duration-500 h-full"
              >
                <SitterCard sitter={sitter} />
              </div>
            ))
          ) : (
            /* Boş Durum (Empty State) */
            <div className="col-span-full text-center py-32 border-2 border-dashed border-zinc-50 rounded-[3rem]">
              <p className="text-stone-300 font-mono italic text-lg uppercase tracking-[0.2em]">
                There are no sitters around here yet... 🧚🏻‍♀️
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaregivingList;
