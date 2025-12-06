/** Token management API client */

import axiosClient from "./axiosClient";

export interface TokenRemainingResponse {
  remaining: {
    user: {
      daily_limit: number | null;
      daily_used: number;
      daily_remaining: number | null;
      monthly_limit: number | null;
      monthly_used: number;
      monthly_remaining: number | null;
      is_unlimited: boolean;
    };
    workshop: {
      monthly_limit: number;
      monthly_used: number;
      monthly_remaining: number;
      reset_date: string | null;
    };
  };
  notifications: {
    workshop_notifications: any[];
    user_notifications: any[];
  };
}

export async function getRemainingTokens(
  workshopId: string
): Promise<TokenRemainingResponse> {
  const response = await axiosClient.get(`/api/v1/tokens/remaining`, {
    params: { workshop_id: workshopId },
  });
  return response.data;
}

export async function validateTokens(
  workshopId: string,
  estimatedTokens: number
): Promise<{
  is_allowed: boolean;
  workshop_ok: boolean;
  user_ok: boolean;
  remaining: any;
}> {
  const response = await axiosClient.post(`/api/v1/tokens/validate`, {
    workshop_id: workshopId,
    estimated_tokens: estimatedTokens,
  });
  return response.data;
}

