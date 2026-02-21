import type { User } from "../types/User";
import { Link } from "react-router-dom";

interface SitterCardProps {
  sitter: User;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
}

const SitterCard = ({ sitter, onUpdate, onDelete }: SitterCardProps) => {
  return (
    <div className="group relative mx-auto flex h-full w-full max-w-sm transform flex-col justify-between rounded-sm border border-stone-200 bg-stone-50 p-6 pb-10 shadow-lg transition-all duration-500 hover:-rotate-1">
      {/* 1. Profile Image Section */}
      <div className="relative mb-6 aspect-square overflow-hidden bg-stone-200 text-stone-400 transition-colors group-hover:bg-stone-100">
        <Link
          to={`/sitters/${sitter._id}`}
          className="relative mb-6 aspect-square overflow-hidden bg-stone-200 text-stone-400 transition-colors group-hover:bg-stone-100 block"
        >
          {sitter.profilePicture ? (
            <img
              src={sitter.profilePicture}
              alt={`${sitter.username}'s profile`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">
              🐾
            </div>
          )}
          <div className="absolute right-2 top-2 bg-stone-900/80 px-2 py-1 text-[9px] font-bold uppercase tracking-tighter text-white backdrop-blur-sm">
            {sitter.homeEnvironment}
          </div>
        </Link>

        {/* Home Environment Badge - Logical addition for quick info */}
        <div className="absolute right-2 top-2 bg-stone-900/80 px-2 py-1 text-[9px] font-bold uppercase tracking-tighter text-white backdrop-blur-sm">
          {sitter.homeEnvironment}
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="space-y-4 px-2">
        <div className="flex items-start justify-between">
          <Link to={`/sitters/${sitter._id}`}>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 decoration-amber-400 underline-offset-8 group-hover:underline">
              {sitter.username}
            </h2>
          </Link>
          {/* Location info if available */}
          {sitter.location && (
            <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest pt-2">
              📍 {sitter.location}
            </span>
          )}
        </div>

        {/* Short Bio or Experience with line clamp for layout stability */}
        <p className="line-clamp-3 font-serif text-base italic leading-snug text-stone-600">
          "
          {sitter.bio ||
            sitter.experience ||
            "Available for pet care services. Feel free to contact for details."}
          "
        </p>
      </div>

      {/* 3. Footer & Action Section */}
      <div className="mt-6 flex items-center justify-between border-t border-stone-100 px-2 pt-8">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">
            Rate per visit
          </span>
          <span className="text-xl font-black text-stone-900">
            ${sitter.expectedFee || 0}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onUpdate && (
            <button
              onClick={() => onUpdate(sitter._id)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition-colors hover:border-stone-900 hover:text-stone-900"
            >
              ✎
            </button>
          )}

          <Link
            to={`/sitters/${sitter._id}`}
            className="rounded-full bg-[#1581BF] px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#1581BF]/90 active:scale-95"
          >
            View Profile 🐾
          </Link>

          {onDelete && (
            <button
              onClick={() => onDelete(sitter._id)}
              className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-sm hover:bg-rose-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitterCard;
