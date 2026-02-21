import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams: ID'yi yakalamak için
import axios from "axios";
import type { Pet } from "../types/Pet";

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8800/api/pets/${id}`);
        console.log("Backend'den ne geliyor aşko?:", res.data);

        const petData = res.data.pet || res.data;
        setPet(petData);
      } catch (error) {
        console.error("Detail fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPetDetail();
  }, [id]); // ID değişirse (başka birine tıklanırsa) tekrar çalışır

  // 4. Veri henüz gelmediyse veya yükleniyorsa "Loading" ekranı
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F7F9]">
        <div className="animate-pulse text-2xl font-black text-[#9BC264]">
          Fetching Pet... 🐾
        </div>
      </div>
    );

  // 5. Eğer veri hiç bulunamadıysa (Hata yönetimi)
  if (!pet)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F7F9]">
        <p className="text-stone-500 italic text-lg">Pet not found... 🧚🏻‍♀️</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F0F7F9] py-20 px-4">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Sol Kısım: Görsel (Tokyo Podyumda!) */}
          <div className="w-full md:w-1/2 relative group">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="h-full w-full object-cover min-h-[400px] max-h-[600px] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Görsel üzerine hafif bir gradient ekleyerek derinlik katalım */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Sağ Kısım: Detaylar */}
          <div className="flex w-full flex-col justify-center p-10 md:p-14 md:w-1/2 bg-white">
            <button
              onClick={() => navigate(-1)}
              className="mb-8 w-fit flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-[#1581BF] transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>{" "}
              Back to Squad
            </button>

            {/* Tür Rozeti (Tag) */}
            <span className="inline-flex w-fit items-center px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-4">
              {pet.type} 🐾
            </span>

            <h1 className="text-6xl font-black uppercase tracking-tighter text-slate-800 leading-none">
              {pet.name}
            </h1>

            {/* Şık Açıklama Alanı */}
            <div className="mt-8 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9BC264] rounded-full"></div>
              <p className="pl-6 font-serif text-xl italic leading-relaxed text-stone-500">
                "{pet.description}"
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {/* İletişim Butonu (Gradient & Shadow) */}
              <button className="w-full py-5 bg-gradient-to-r from-[#1581BF] to-[#2b6592] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all active:scale-95">
                Contact The Owner 🦴
              </button>

              <p className="text-center text-[9px] font-bold text-stone-300 uppercase tracking-[0.3em]">
                Snouty Trusted Member
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
