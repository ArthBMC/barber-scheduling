export default function Footer({ onOpenBooking, onOpenConsult, onOpenBarberArea }) {
  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Galeria", href: "#galeria" },
    { label: "Serviços", href: "#servicos" },
    { label: "Histórico", action: onOpenConsult },
    { label: "Área do barbeiro", action: onOpenBarberArea },
  ];

  const handleLinkClick = (link, e) => {
    if (link.action) {
      e.preventDefault();
      link.action();
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 pt-16 pb-12 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#inicio" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L3 3m6.121 6.121L3 15m0 0l2.879 2.879M3 15l6.121-6.121" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  RAFA <span className="text-gradient-gold">BARBER</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold -mt-1">
                  Corte & Estilo
                </span>
              </div>
            </a>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Mais do que um simples corte de cabelo, oferecemos uma experiência completa de cuidado masculino com ambiente exclusivo e atendimento premium.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {["Instagram", "WhatsApp", "Facebook", "Google Maps"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-orange-400 hover:border-amber-500/50 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Mandatory Links (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Navegação Principal
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href || "#"}
                    onClick={(e) => handleLinkClick(link, e)}
                    className="text-sm text-zinc-300 hover:text-orange-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours Quick Card (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Atendimento
            </h4>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Seg - Sex:</span>
                <span className="font-semibold text-white">09h às 20h</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Sábado:</span>
                <span className="font-semibold text-white">08h às 19h</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Domingo:</span>
                <span className="text-zinc-500">Fechado</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 rounded-xl font-bold text-xs text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer text-center"
            >
              Agendar Meu Horário
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Rafa Barber Shop. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com <span className="text-orange-400">⚡</span> excelência & precisão.
          </p>
        </div>
      </div>
    </footer>
  );
}
