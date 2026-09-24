import apiClient from "@/api/client";

/**
 * Cria um novo agendamento no backend.
 * @param {{ clientName: string, clientPhone: string, barberId: number, serviceTypeId: number, moment: string }} bookingData
 */
export async function createBooking(bookingData) {
  const response = await apiClient.post("/bookings", bookingData);
  return response.data;
}

/**
 * Consulta histórico de agendamentos por telefone do cliente.
 * @param {string} phone
 */
export async function getBookingHistory(phone) {
  const response = await apiClient.get("/bookings/history", {
    params: { phone },
  });
  return response.data;
}

/**
 * Atualiza o status de um agendamento (ex: cancelamento).
 * @param {number|string} id
 * @param {"WAITING_CONFIRMATION" | "CONFIRMED" | "CONCLUDED" | "CANCELED"} status
 */
export async function updateBookingStatus(id, status) {
  const response = await apiClient.patch(`/bookings/${id}/status`, null, {
    params: { status },
  });
  return response.data;
}
