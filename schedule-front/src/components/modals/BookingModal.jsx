import { useState, useEffect } from "react";
import { useServices } from "@/hooks/useServices";
import { useBarbers } from "@/hooks/useBarbers";
import { createBooking } from "@/services/bookingService";
import { formatCurrency, formatDuration } from "@/utils/formatters";

export default function BookingModal({ isOpen, onClose, selectedService }) {
  const { services } = useServices();
  const { barbers, timeSlots, loadingSchedule, getAvailableSchedule } = useBarbers();

  const [formData, setFormData] = useState({
    serviceId: "",
    barber: "",
    barberId: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    clientName: "",
    clientPhone: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  // Define o serviço inicial selecionado quando abrir ou carregar serviços
  const currentServiceId = formData.serviceId || selectedService?.id || (services[0]?.id ? String(services[0].id) : "");

  // Buscar horários quando barbeiro ou data mudam
  useEffect(() => {
    if (formData.barberId && formData.date) {
      getAvailableSchedule(formData.barberId, formData.date);
    }
  }, [formData.barberId, formData.date, getAvailableSchedule]);

  if (!isOpen) return null;

  const currentServiceObj = services.find(
    (s) => String(s.id) === String(currentServiceId)
  ) || services[0] || {
    id: 0,
    name: "Serviço",
    price: 0,
    duration: "-",
  };

  const handleClose = () => {
    setIsSuccess(false);
    setConfirmedData(null);
    setFormData({
      serviceId: "",
      barber: "",
      barberId: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      clientName: "",
      clientPhone: "",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.barberId) {
      alert("Por favor, selecione um profissional.");
      return;
    }

    if (!formData.time) {
      alert("Por favor, selecione um horário.");
      return;
    }

    setSubmitting(true);
    try {
      const timeFormatted = formData.time.length === 5 ? `${formData.time}:00` : formData.time;

      const bookingPayload = {
        clientName: formData.clientName.trim(),
        clientPhone: formData.clientPhone.trim(),
        barberId: parseInt(formData.barberId, 10),
        serviceTypeId: parseInt(currentServiceId, 10),
        moment: `${formData.date}T${timeFormatted}`,
      };

      const response = await createBooking(bookingPayload);
      console.log("Agendamento criado:", response);

      setConfirmedData({
        clientName: formData.clientName,
        serviceName: currentServiceObj.name,
        price: currentServiceObj.price,
        date: formData.date,
        time: formData.time,
        barber: formData.barber,
      });

      setIsSuccess(true);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Erro ao criar agendamento. Por favor, tente novamente.";
      alert(errorMsg);
      console.error("Erro no submit do agendamento:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-orange-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">Agendamento Online</h3>
              <p className="text-xs text-zinc-400">Escolha o serviço, barbeiro e horário</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess && confirmedData ? (
            /* Success State */
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-2xl font-black text-white">Agendamento Confirmado!</h4>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                Tudo certo, <span className="text-white font-bold">{confirmedData.clientName}</span>! Seu horário para{" "}
                <span className="text-amber-400 font-bold">{confirmedData.serviceName}</span> foi reservado para dia{" "}
                <span className="text-white font-semibold">{confirmedData.date}</span> às{" "}
                <span className="text-white font-semibold">{confirmedData.time}</span>.
              </p>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs text-zinc-300 space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Profissional:</span>
                  <span className="font-semibold text-white">{confirmedData.barber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Valor Total:</span>
                  <span className="font-bold text-amber-400">{formatCurrency(confirmedData.price)}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl font-bold text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  1. Selecione o Serviço
                </label>
                <select
                  value={currentServiceId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, serviceId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-medium focus:border-orange-500 focus:outline-none"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {formatCurrency(s.price)} ({formatDuration(s.duration)})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Barber Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  2. Escolha o Profissional
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {barbers.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setFormData((prev) => ({ ...prev, barber: b.name, barberId: b.id }))}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        String(formData.barberId) === String(b.id)
                          ? "bg-orange-500/10 border-orange-500 text-amber-400"
                          : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Date and Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    3. Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Horário {loadingSchedule && <span className="text-orange-400 text-[10px]">(carregando...)</span>}
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                    required
                  >
                    <option value="">Selecione um horário</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Customer Info */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  4. Seus Dados de Contato
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.clientName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Seu WhatsApp / Telefone (ex: 11999999999)"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clientPhone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-zinc-800">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-bold text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-xl shadow-orange-500/25 active:scale-98 transition-all cursor-pointer text-base disabled:opacity-50"
                >
                  {submitting ? "Processando..." : "Confirmar Agendamento"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
