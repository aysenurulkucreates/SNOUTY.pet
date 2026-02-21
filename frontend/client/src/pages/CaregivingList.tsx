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
    <div className="min-h-screen bg-[#F0F7F9] py-12 px-12 transition-colors duration-500">
      <div className="mb-16 text-center">
        {/* Başlık: text-slate-800 (Daha profesyonel ve okunaklı) */}
        <h2 className="text-5xl text-[#7DA14F] uppercase tracking-tighter font-black drop-shadow-sm">
          Find Sitter
        </h2>
        <p className="text-stone-500 mt-4 font-bold tracking-wide uppercase text-xs opacity-80">
          Check out all the sitters in the neighborhood to make a new caregiver
        </p>
        {/* Çizgi: bg-amber-400 (Karttaki dekorasyonla uyumlu hale getirdim bebişim) */}
        <div className="w-24 h-1 bg-amber-400 mx-auto mt-6 rounded-full opacity-60"></div>
      </div>

      {/* Kartların Dizileceği Grid Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {sitters.length > 0 ? (
          sitters.map((sitter) => (
            <div
              key={sitter._id}
              className="hover:scale-[1.02] transition-transform duration-300"
            >
              <SitterCard sitter={sitter} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            {/* Yazı rengi: text-stone-400 (Daha belirgin) */}
            <p className="text-stone-400 font-medium italic text-lg">
              There are no sitters around here yet... 🧚🏻‍♀️
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaregivingList;
