import apiClient from "@/api/client";

export async function getBarbers() {
  const response = await apiClient.get("/barbers");
  return response.data;
}

export async function getAvailableSchedule(barberId, date) {
  const response = await apiClient.get(`/barbers/${barberId}/available-schedule`, {
    params: { date },
  });
  return response.data;
}
