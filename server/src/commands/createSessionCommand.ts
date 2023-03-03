import { PrismaClient } from "@prisma/client";

interface CreateSessionCommandParams {
  name: string;
  teamId: number;
}

export default async (
  prisma: PrismaClient,
  params: CreateSessionCommandParams
) => {
  const { name, teamId } = params;

  const session = await prisma.sessions.create({
    data: { name: name, playerIds: [], teamId: teamId, active: true },
  });

  return session;
};

