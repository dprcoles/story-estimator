import { PrismaClient } from "@prisma/client";
import { PlayerType } from "../types/player";

export interface CreatePlayerRequest {
  name: string;
  defaultType: PlayerType;
  emoji: string;
}

export default async (prisma: PrismaClient, params: CreatePlayerRequest) => {
  const { name, defaultType, emoji } = params;

  const result = await prisma.players.create({
    data: {
      defaultType: defaultType,
      emoji: emoji,
      name: name,
    },
  });

  return result;
};
