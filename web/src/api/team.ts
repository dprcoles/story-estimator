import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export const getTeam = async (id: number) => {
  const response = await fetch(`${API_URL}/team/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const result = await handleApiResponse(response);

  return result;
};

