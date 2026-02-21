import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams: ID'yi yakalamak için
import axios from "axios";
import type { User } from "../types/User";

const SitterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [sitter, setSitter] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitterDetail = async () => {
      try {
        setLoading(true);
        // 3. ID'yi kullanarak backend'e özel bir istek atıyoruz
        const res = await axios.get(
          `http://localhost:8800/api/user/caregiving/${id}`,
        );
        setSitter(res.data.sitter);
      } catch (error) {
        console.error("Detail fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSitterDetail();
  }, [id]); // ID değişirse (başka birine tıklanırsa) tekrar çalışır

  // 4. Veri henüz gelmediyse veya yükleniyorsa "Loading" ekranı
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F7F9]">
        <div className="animate-pulse text-2xl font-black text-[#9BC264]">
          Fetching Sitter... 🐾
        </div>
      </div>
    );

  // 5. Eğer veri hiç bulunamadıysa (Hata yönetimi)
  if (!sitter)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F0F7F9]">
        <p className="text-stone-500 italic text-lg">Sitter not found... 🧚🏻‍♀️</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F0F7F9] py-20 px-4">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Sol Kısım: Görsel */}
          <div className="w-full md:w-1/2">
            <img
              src={sitter.profilePicture || "https://via.placeholder.com/600"}
              alt={sitter.username}
              className="h-full w-full object-cover max-h-[500px]"
            />
          </div>

          {/* Sağ Kısım: Detaylar */}
          <div className="flex w-full flex-col justify-center p-12 md:w-1/2">
            <button
              onClick={() => navigate(-1)} // Geri gitme butonu
              className="mb-6 w-fit text-xs font-black uppercase tracking-widest text-stone-400 hover:text-stone-900"
            >
              ← Back to List
            </button>

            <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-800">
              {sitter.username}
            </h1>

            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-[#EBF4E6] px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-[#4D7C0F]">
                {sitter.homeEnvironment || "Standard Home"}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-stone-500">
                📍 {sitter.location || "Earth"}
              </span>
            </div>

            <p className="mt-8 font-serif text-lg italic leading-relaxed text-stone-600">
              "
              {sitter.bio ||
                sitter.experience ||
                "A passionate animal lover ready to help your friends!"}
              "
            </p>

            <div className="mt-10 border-t border-stone-100 pt-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  Rate per visit
                </p>
                <p className="text-3xl font-black text-slate-900">
                  ${sitter.expectedFee || 0}
                </p>
              </div>

              <button className="rounded-full bg-[#1581BF] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl transition-transform hover:scale-105 active:scale-95">
                Contact Sitter 🐾
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitterDetails;
