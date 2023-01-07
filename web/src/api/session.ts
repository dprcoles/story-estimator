import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export const getSession = async (id: string) => {
  const response = await fetch(`${API_URL}/session/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const result = await handleApiResponse(response);

  return result;
};

