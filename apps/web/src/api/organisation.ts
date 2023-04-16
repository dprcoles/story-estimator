import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export const getOrganisation = async (alias: string) => {
  const response = await fetch(`${API_URL}/organisation/${alias}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const result = await handleApiResponse(response);

  return result;
};
