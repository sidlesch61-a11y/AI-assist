import axiosClient from "./axiosClient";

export async function fetchAdminHealth(): Promise<{ status: string }> {
  const { data } = await axiosClient.get<{ status: string }>("/v1/admin/health");
  return data;
}


