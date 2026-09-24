import { useServices } from "@/hooks/useServices";
import { formatCurrency, formatDuration } from "@/utils/formatters";

export default function ServicesList({ onSelectService }) {
  const { services, loading, error } = useServices();

  return (
    <section id="servicos" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L3 3m6.121 6.121L3 15m0 0l2.879 2.879M3 15l6.121-6.121" />
            </svg>
            Tabela de Serviços
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Nossos <span className="text-gradient-gold">Serviços Exclusivos</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Escolha o serviço ideal para o seu estilo. Todos os atendimentos incluem lavagem e produtos de alta qualidade.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900/60 rounded-2xl p-6 border border-zinc-800/80 animate-pulse space-y-4">
                <div className="h-6 bg-zinc-800 rounded w-2/3" />
                <div className="h-16 bg-zinc-800/50 rounded" />
                <div className="h-8 bg-zinc-800 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800 max-w-xl mx-auto p-6">
            <p className="text-zinc-400 text-sm">Não foi possível carregar os serviços no momento.</p>
            <p className="text-xs text-zinc-500 mt-1">Verifique se o backend está em execução na porta 8080.</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-zinc-900/80 rounded-2xl p-6 border border-zinc-800/80 hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div>
                  {/* Top Bar: Icon & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 0L3 3m6.121 6.121L3 15m0 0l2.879 2.879M3 15l6.121-6.121" />
                      </svg>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-semibold">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDuration(service.duration)}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {service.name}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                    {service.description || "Atendimento completo com produtos de excelência e toalha quente."}
                  </p>
                </div>

                {/* Price and Action Footer */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-zinc-500 block font-medium">Valor</span>
                    <span className="text-2xl font-black text-white">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-md shadow-orange-500/20 active:scale-95 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
