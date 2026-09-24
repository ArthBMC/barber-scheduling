export default function LocationSection() {
  const scheduleDays = [
    { day: "Segunda-feira", hours: "09:00 às 20:00", open: true },
    { day: "Terça-feira", hours: "09:00 às 20:00", open: true },
    { day: "Quarta-feira", hours: "09:00 às 20:00", open: true },
    { day: "Quinta-feira", hours: "09:00 às 20:00", open: true },
    { day: "Sexta-feira", hours: "09:00 às 21:00", open: true },
    { day: "Sábado", hours: "08:00 às 19:00", open: true },
    { day: "Domingo", hours: "Fechado", open: false },
  ];

  return (
    <section id="localizacao" className="py-24 bg-zinc-950/95 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Venha Nos Visitar
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Nossa <span className="text-gradient-gold">Localização & Horários</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-base">
            Ambiente climatizado, café expresso cortesia, cerveja gelada e espaço de convivência para você relaxar.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Google Maps Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl relative min-h-95 lg:min-h-120">
            <iframe
              title="Google Maps Location - Rafa Barber Shop"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975924719524!2d-46.65657118439401!3d-23.561349584682855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1629837281920!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.9)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-95 lg:min-h-120"
            />
          </div>

          {/* Opening Hours Card */}
          <div className="lg:col-span-5 bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-zinc-800 flex flex-col justify-between shadow-2xl relative">
            <div>
              {/* Header Status Badge */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Horário de Funcionamento</h3>
                    <p className="text-xs text-zinc-400">Atendimento com ou sem agendamento</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Aberto Agora
                </span>
              </div>

              {/* Days List */}
              <div className="space-y-3.5 mb-8">
                {scheduleDays.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm py-1 border-b border-zinc-800/40 last:border-0"
                  >
                    <span className="text-zinc-300 font-medium">{item.day}</span>
                    <span className={item.open ? "text-amber-400 font-semibold" : "text-zinc-500 font-medium"}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Actions */}
            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs text-zinc-400 font-semibold uppercase">Endereço</h4>
                  <p className="text-sm font-medium text-white">Av. Paulista, 1500 - Bela Vista, São Paulo - SP</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs text-center border border-zinc-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Como Chegar (GPS)
                </a>

                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs text-center shadow-lg shadow-emerald-600/20 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.195 4.179-1.096z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
