/**
 * Utility formatters for data received from / sent to the Java backend.
 */

export function formatCurrency(value) {
  if (value == null || isNaN(Number(value))) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export function formatDuration(minutes) {
  if (!minutes) return "-";
  const mins = Number(minutes);
  if (isNaN(mins)) return String(minutes);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMinutes = mins % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes} min` : `${hours}h`;
}

export function formatStatus(status) {
  const statusMap = {
    WAITING_CONFIRMATION: { label: "Aguardando", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    CONFIRMED: { label: "Confirmado", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    CONCLUDED: { label: "Concluído", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
    CANCELED: { label: "Cancelado", color: "text-red-400 bg-red-500/10 border-red-500/30" },
  };

  return statusMap[status] || { label: status || "-", color: "text-zinc-400 bg-zinc-800 border-zinc-700" };
}

export function formatDateTime(isoString) {
  if (!isoString) return { date: "-", time: "-", full: "-" };
  
  try {
    const parts = isoString.split("T");
    const datePart = parts[0];
    const timePart = parts[1] || "";

    const [year, month, day] = datePart.split("-");
    const formattedDate = day && month && year ? `${day}/${month}/${year}` : datePart;
    const formattedTime = timePart ? timePart.slice(0, 5) : "";

    return {
      date: formattedDate,
      time: formattedTime,
      full: formattedTime ? `${formattedDate} às ${formattedTime}` : formattedDate,
    };
  } catch {
    return { date: isoString, time: "", full: isoString };
  }
}
