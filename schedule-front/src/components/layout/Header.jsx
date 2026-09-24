import { useState } from "react";

export default function Header({ onOpenBooking, onOpenConsult, onOpenBarberArea }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "#inicio" },
    { label: "Galeria", href: "#galeria" },
    { label: "Serviços", href: "#servicos" },
    { label: "Histórico", action: onOpenConsult },
    { label: "Área do barbeiro", action: onOpenBarberArea },
  ];

  const handleNavClick = (item, e) => {
    if (item.action) {
      e.preventDefault();
      item.action();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090b]/85 border-b border-zinc-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L3 3m6.121 6.121L3 15m0 0l2.879 2.879M3 15l6.121-6.121" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
              RAFA <span className="text-gradient-gold">BARBER</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold -mt-1">
              Corte & Estilo
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href || "#"}
              onClick={(e) => handleNavClick(item, e)}
              className="px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-orange-400 hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden px-5 py-2.5 rounded-full font-semibold text-sm text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-md shadow-orange-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-bold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar Agora
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            aria-label="Alternar Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href || "#"}
              onClick={(e) => handleNavClick(item, e)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-200 hover:text-orange-400 hover:bg-zinc-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl font-bold text-zinc-950 bg-gradient-gold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar Horário
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
