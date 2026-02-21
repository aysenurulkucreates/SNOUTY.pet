const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-zinc-50 py-10 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start group">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-zinc-600 transition-colors">
            © 2026 Snouty Squad
          </p>
          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 mt-1">
            Handcrafted with
            <span className="text-rose-400 animate-pulse">🐾</span> by Ayşe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
