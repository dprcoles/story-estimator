import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export const getSession = async (id: number) => {
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

export interface ICreateSessionBody {
  name: string;
  teamId?: number;
}

export const createSession = async (body: ICreateSessionBody) => {
  const response = await fetch(`${API_URL}/session`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const result = await handleApiResponse(response);

  return result;
};
