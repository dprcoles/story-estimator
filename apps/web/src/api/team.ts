import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export const getTeam = async (alias: string) => {
  const response = await fetch(`${API_URL}/team/${alias}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const result = await handleApiResponse(response);

  return result;
};

export const createTeam = async (data: {
  organisationId: number;
  name: string;
  alias: string;
}) => {
  const response = await fetch(`${API_URL}/team`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = await handleApiResponse(response);

  return result;
};
