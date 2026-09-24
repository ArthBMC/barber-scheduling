import { useState, useCallback } from "react";
import { getBookingHistory, updateBookingStatus } from "@/services/bookingService";

export function useHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async (phone) => {
    if (!phone || phone.trim().length < 3) {
      setBookings([]);
      return [];
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getBookingHistory(phone.trim());
      const list = Array.isArray(data) ? data : [];
      setBookings(list);
      return list;
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
      setError(err);
      setBookings([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (bookingId) => {
    try {
      await updateBookingStatus(bookingId, "CANCELED");
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, bookingStatus: "CANCELED" } : b))
      );
      return true;
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      throw err;
    }
  }, []);

  return { bookings, loading, error, fetchHistory, cancelBooking };
}

export default useHistory;
