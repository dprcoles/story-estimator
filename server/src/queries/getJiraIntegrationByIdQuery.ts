import { PrismaClient } from "@prisma/client";

export default async (prisma: PrismaClient, id: number) => {
  return await prisma.jiraIntegrations.findFirstOrThrow({
    where: { id: id },
    include: { jql_queries: true },
  });
};
