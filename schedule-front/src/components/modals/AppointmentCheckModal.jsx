import { useState } from "react";
import { useHistory } from "@/hooks/useHistory";
import { formatCurrency, formatStatus, formatDateTime } from "@/utils/formatters";

export default function AppointmentCheckModal({ isOpen, onClose, onOpenBooking }) {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const { bookings, loading, error, fetchHistory, cancelBooking } = useHistory();

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    try {
      await fetchHistory(phone);
    } catch {
      // erro tratado no hook
    }
  };

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm("Tem certeza que deseja cancelar este agendamento?");
    if (!confirmCancel) return;

    try {
      await cancelBooking(bookingId);
      alert("Agendamento cancelado com sucesso.");
    } catch (err) {
      alert("Não foi possível cancelar o agendamento no momento.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">Consultar Agendamento</h3>
              <p className="text-xs text-zinc-400">Digite seu WhatsApp ou telefone cadastrado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="tel"
              placeholder="Digite seu telefone (ex: 11999999999)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-amber-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl font-bold text-sm text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "..." : "Buscar"}
            </button>
          </form>

          {/* Results */}
          {searched && !loading && (
            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
                  Erro ao buscar agendamentos. Verifique se o telefone está correto e o backend ativo.
                </div>
              )}

              {bookings.length > 0 ? (
                bookings.map((item) => {
                  const serviceName = item.serviceType?.name || "Serviço";
                  const barberName = item.barber?.name || "Barbeiro";
                  const statusInfo = formatStatus(item.bookingStatus);
                  const dateTime = formatDateTime(item.moment);
                  const price = item.bookedPrice ?? item.serviceType?.price;
                  const canCancel = item.bookingStatus !== "CANCELED" && item.bookingStatus !== "CONCLUDED";

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase font-mono block">
                            Código: #{item.id}
                          </span>
                          <h4 className="font-bold text-white text-base">{serviceName}</h4>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-zinc-500 block">Profissional:</span>
                          <span className="text-zinc-200 font-medium">{barberName}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block">Data & Horário:</span>
                          <span className="text-amber-400 font-bold">{dateTime.full}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-zinc-800/60">
                        <span className="text-zinc-400">
                          Valor: <strong className="text-white">{formatCurrency(price)}</strong>
                        </span>
                        {canCancel && (
                          <button
                            onClick={() => handleCancel(item.id)}
                            className="text-red-400 hover:text-red-300 font-semibold cursor-pointer transition-colors"
                          >
                            Cancelar Agendamento
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                !error && (
                  <div className="py-8 text-center bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                    <p className="text-sm text-zinc-400 mb-3">Nenhum agendamento encontrado para este número.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-colors cursor-pointer"
                    >
                      Fazer um novo agendamento
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
