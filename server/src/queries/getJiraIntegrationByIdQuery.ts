import { PrismaClient } from "@prisma/client";

interface GetJiraIntegrationByIdQueryParams {
  id: string;
}

export default async (
  prisma: PrismaClient,
  params: GetJiraIntegrationByIdQueryParams
) => {
  const { id } = params;

  const data = await prisma.jira_integrations.findFirstOrThrow({
    where: { id: id },
  });

  return data;
};

