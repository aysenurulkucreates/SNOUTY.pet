import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-[calc(100vh-100px)] w-full overflow-hidden">
      {/* 1. Arka Plan Görseli ve Karartma Filmi */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618673402514-138a2e299099?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Yazıların okunması için üzerine siyah bir perde çekiyoruz */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. İçerik Alanı (Tam Ortada) */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        {/* Ana Başlık */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
          The best for your friend{" "}
          <span className="text-[#EBB446]">Snouty</span>
        </h1>

        {/* Alt Bilgi */}
        <p className="text-lg md:text-xl text-zinc-100 mb-10 max-w-2xl font-medium drop-shadow-md">
          The easiest way to find that cheerful paw or reliable caregiver you're
          looking for. Start exploring now!
        </p>

        {/* 3. Butonlar (Senin İstediğin O İki Dev Buton) */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/pets"
            className="px-10 py-4 bg-[#628141] text-white font-black rounded-full text-lg uppercase tracking-widest hover:bg-[#4a6131] hover:scale-105 transition-all shadow-xl"
          >
            Explore Pet
          </Link>

          <Link
            to="/sitters"
            className="px-10 py-4 bg-[#1581BF] text-white font-black rounded-full text-lg uppercase tracking-widest hover:bg-[#0e5d8a] hover:scale-105 transition-all shadow-xl"
          >
            Find Caregiving
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
