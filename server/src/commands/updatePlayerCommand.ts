import { PrismaClient } from "@prisma/client";
import { PlayerType } from "../types";

interface UpdatePlayerCommandParams {
  id: string;
  name: string;
  defaultType: PlayerType;
  emoji: string;
}

export default async (
  prisma: PrismaClient,
  params: UpdatePlayerCommandParams
) => {
  const { id, name, defaultType, emoji } = params;

  const result = await prisma.players.update({
    data: {
      defaultType: defaultType,
      emoji: emoji,
      name: name,
    },
    where: { id: id },
  });

  return result;
};
