import { useEffect, useState, useCallback } from "react";
import { getBarbers, getAvailableSchedule } from "@/services/barberService";

export function useBarbers() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getBarbers()
      .then((data) => {
        if (isMounted) setBarbers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erro ao carregar barbeiros:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchSchedule = useCallback(async (barberId, date) => {
    if (!barberId || !date) {
      setTimeSlots([]);
      return [];
    }
    setLoadingSchedule(true);
    try {
      const data = await getAvailableSchedule(barberId, date);
      const slots = Array.isArray(data) ? data : [];
      setTimeSlots(slots);
      return slots;
    } catch (err) {
      console.error("Erro ao buscar horários disponíveis:", err);
      setTimeSlots([]);
      return [];
    } finally {
      setLoadingSchedule(false);
    }
  }, []);

  return {
    barbers,
    loading,
    timeSlots,
    loadingSchedule,
    getAvailableSchedule: fetchSchedule,
  };
}

export default useBarbers;
