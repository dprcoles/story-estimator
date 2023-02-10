import { PrismaClient } from "@prisma/client";

interface GetJiraIntegrationByIdQueryParams {
  id: number;
}

export default async (
  prisma: PrismaClient,
  params: GetJiraIntegrationByIdQueryParams
) => {
  const { id } = params;

  const data = await prisma.jiraIntegrations.findFirstOrThrow({
    where: { id: id },
    include: { jql_queries: true },
  });

  return data;
};

