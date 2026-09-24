export default function HeroSection({ onOpenBooking, onOpenConsult }) {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zinc-950">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 sm:w-125 h-87.5 sm:h-125 bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-62.5 h-62.5 bg-yellow-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-size-4rem_4rem mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/30 text-amber-400 text-xs font-semibold tracking-wide mb-8 shadow-lg shadow-orange-500/10 backdrop-blur-md">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-zinc-200">A melhor experiência em corte & barba</span>
        </div>

        {/* Central Logo / Photo Badge */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-zinc-950 flex items-center justify-center overflow-hidden border border-amber-500/40 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80"
              alt="Rafa Barber Logo"
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex items-end justify-center pb-2">
              <span className="text-[10px] tracking-widest uppercase font-extrabold text-orange-400 bg-zinc-900/90 px-3 py-0.5 rounded-full border border-orange-500/30">
                Est. 2020
              </span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4">
          ESTILO, TRADIÇÃO & <br />
          <span className="text-gradient-gold">EXCELÊNCIA NO SEU VISUAL</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed font-normal">
          Agende seu horário com os melhores profissionais da região. Cortes modernos, barba com toalha quente e atendimento personalizado.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto min-w-[210px] px-8 py-4 rounded-xl font-bold text-base text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-xl shadow-orange-500/25 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agendar horário
          </button>

          <button
            onClick={onOpenConsult}
            className="w-full sm:w-auto min-w-52.5 px-8 py-4 rounded-xl font-semibold text-base text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 shadow-lg active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <svg className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Consultar agendamentos
          </button>
        </div>

        {/* Highlights Row */}
        <div className="mt-14 pt-8 border-t border-zinc-800/60 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-xl text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white">4.9/5</span>
            <span className="text-xs text-zinc-500 font-medium">Avaliação Google</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-gradient-gold">+5.000</span>
            <span className="text-xs text-zinc-500 font-medium">Clientes Atendidos</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-extrabold text-white">100%</span>
            <span className="text-xs text-zinc-500 font-medium">Satisfação Garantida</span>
          </div>
        </div>
      </div>
    </section>
  );
}
