import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export interface IGetJiraIntegrationByIdParams {
  id: number;
}

export const getJiraIntegrationById = async (
  params: IGetJiraIntegrationByIdParams,
) => {
  const { id } = params;
  const response = await fetch(`${API_URL}/jira/integration/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const result = await handleApiResponse(response);

  return result;
};

export interface IGetJiraIssuesByQueryIdParams {
  integrationId: number;
  id: number;
}

export const getJiraIssuesByQueryId = async (
  params: IGetJiraIssuesByQueryIdParams,
) => {
  const { integrationId, id } = params;
  const response = await fetch(
    `${API_URL}/jira/query?integrationId=${integrationId}&queryId=${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  );

  const { issues } = await handleApiResponse(response);

  return issues;
};
