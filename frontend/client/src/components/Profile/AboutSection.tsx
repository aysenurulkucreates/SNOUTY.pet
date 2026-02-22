import type { User } from "../../types/User";

interface AboutSectionProps {
  user: User | null;
  onEditClick: () => void;
}

const AboutSection = ({ user, onEditClick }: AboutSectionProps) => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] py-12 px-10 transition-all">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-zinc-100 min-h-[85vh] flex flex-col items-center justify-start">
        {/* 🚀 Pırlanta Profil Kartı */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-12 bg-zinc-50/50 p-10 rounded-[3rem] border border-zinc-50 mt-10">
          {/* Avatar Alanı */}
          <div className="relative">
            <div className="w-40 h-40 bg-[#EBB446] rounded-[2.5rem] flex items-center justify-center text-white text-6xl shadow-xl shadow-amber-900/10 border-4 border-white overflow-hidden">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>
            {/* Online Status */}
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white animate-pulse"></div>
          </div>

          {/* Bilgi Alanı */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h3 className="text-4xl font-black text-[#4A2C21] uppercase tracking-tighter italic">
                {user?.username || "Member"}
              </h3>
              <p className="text-zinc-400 font-mono text-[11px] mt-1 uppercase tracking-widest">
                {user?.location || "No location set"}
              </p>
            </div>

            {/* 🛡️ Rozetler (Tags) - Hatayı Çözen Pırlanta Kısım */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {user?.tags &&
              Array.isArray(user.tags) &&
              user.tags.length > 0 ? (
                user.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-[#63783A]/10 text-[#63783A] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#63783A]/20 shadow-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-[10px] font-bold text-zinc-300 uppercase italic tracking-widest">
                  No badges yet... 🐾
                </span>
              )}
            </div>

            {/* Bio Alanı */}
            <div className="pt-4 border-t border-zinc-200/50">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  About Me
                </span>
                <p className="text-sm italic text-zinc-600 font-serif leading-relaxed">
                  {user?.bio || "No bio yet..."}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Butonu */}
          <button
            onClick={onEditClick}
            className="mt-8 px-10 py-4 bg-[#4A2C21] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#63783A] transition-all shadow-xl active:scale-95"
          >
            Edit Profile ✎
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
