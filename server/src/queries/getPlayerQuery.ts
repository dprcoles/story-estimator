import { PrismaClient } from "@prisma/client";

interface GetPlayerQueryParams {
  id: string;
}

export default async (prisma: PrismaClient, params: GetPlayerQueryParams) => {
  const { id } = params;

  const player = await prisma.players.findFirst({ where: { id: id } });

  return player;
};
