import { PrismaClient } from "@prisma/client";
import { PlayerType } from "../types";

interface CreatePlayerCommandParams {
  name: string;
  defaultType: PlayerType;
  emoji: string;
}

export default async (
  prisma: PrismaClient,
  params: CreatePlayerCommandParams
) => {
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

