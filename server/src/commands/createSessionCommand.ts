import { PrismaClient } from "@prisma/client";

interface CreateSessionCommandParams {
  name: string;
  teamId: string;
}

export default async (
  prisma: PrismaClient,
  params: CreateSessionCommandParams
) => {
  const { name, teamId } = params;

  const session = await prisma.sessions.create({
    data: { name: name, playerIds: [], storyIds: [], teamId: teamId },
  });

  return session;
};

