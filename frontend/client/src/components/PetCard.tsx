import type { Pet } from "../types/Pet";
import { Link } from "react-router-dom";

interface PetCardProps {
  pet: Pet;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updatedFields?: Partial<Pet>) => void;
}

const PetCard = ({ pet, onDelete, onUpdate }: PetCardProps) => {
  return (
    <div className="w-full h-full max-w-sm flex flex-col justify-between bg-stone-50 p-6 pb-10 shadow-lg border border-stone-200 rounded-sm transform hover:-rotate-1 transition-all duration-500 group mx-auto">
      <div>
        {/* 🐾 Görsel Alanı: Çift katmanlı Link hatası temizlendi */}
        <Link
          to={`/pets/${pet._id}`}
          className="aspect-square bg-stone-200 mb-6 overflow-hidden flex items-center justify-center text-stone-400 group-hover:bg-stone-100 transition-colors relative block"
        >
          {pet.imageUrl ? (
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl">🐾</span>
          )}
        </Link>

        <div className="space-y-4 px-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase underline decoration-amber-400 underline-offset-8">
            {pet.name}
          </h2>

          <p className="text-stone-600 text-base font-serif italic leading-snug pt-1 line-clamp-3">
            "{pet.description}"
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 px-2 border-t border-stone-100 mt-4">
        <span className="bg-stone-800 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
          {pet.type}
        </span>
        <div className="flex gap-2">
          {onUpdate && (
            <button
              onClick={() => onUpdate(pet._id)}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-sm hover:bg-stone-900 hover:text-white transition-colors"
            >
              ✎
            </button>
          )}
          {!onUpdate && (
            <Link
              to={`/pets/${pet._id}`}
              className="px-3 py-1.5 bg-[#1581BF] text-white text-[10px] font-bold rounded-full hover:bg-[#1581BF]/80 transition-all uppercase tracking-widest shadow-md"
            >
              View Details 🐾
            </Link>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(pet._id)}
              className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-sm hover:bg-rose-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
