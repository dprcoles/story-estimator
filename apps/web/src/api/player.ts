import { PlayerType } from "@/types/player";
import { StorageItem } from "@/types/storage";
import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export interface ICreatePlayerBody {
  defaultType: PlayerType;
  emoji: string;
  name: string;
}

export const createPlayer = async (body: ICreatePlayerBody) => {
  const response = await fetch(`${API_URL}/player`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await handleApiResponse(response);

  localStorage.setItem(StorageItem.PlayerId, result.id);
  return result;
};

export type IUpdatePlayerBody = ICreatePlayerBody;

export const updatePlayer = async (id: number, body: IUpdatePlayerBody) => {
  const response = await fetch(`${API_URL}/player/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await handleApiResponse(response);
};

export const getPlayer = async (id: number) => {
  const response = await fetch(`${API_URL}/player/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const result = await handleApiResponse(response);

  localStorage.setItem(StorageItem.PlayerId, result.id);
  return result;
};
