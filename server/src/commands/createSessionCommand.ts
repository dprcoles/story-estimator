import { PrismaClient } from "@prisma/client";

export interface CreateSessionRequest {
  name: string;
  teamId: number;
}

export default async (prisma: PrismaClient, params: CreateSessionRequest) => {
  const { name, teamId } = params;

  const session = await prisma.sessions.create({
    data: { name: name, playerIds: [], teamId: teamId, active: true },
  });

  return session;
};
