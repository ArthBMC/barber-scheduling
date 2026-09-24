import apiClient from "@/api/client";

export async function getServices() {
  const response = await apiClient.get("/services");
  return response.data;
}
