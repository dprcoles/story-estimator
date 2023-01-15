import { API_URL } from "@/utils/constants";
import { handleApiResponse } from "@/utils/helpers";

export interface IGetJiraIntegrationByIdParams {
  id: string;
}

export const getJiraIntegrationById = async (
  params: IGetJiraIntegrationByIdParams
) => {
  const { id } = params;
  const response = await fetch(`${API_URL}/jira-integration/${id}`, {
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
  integrationId: string;
  id: string;
}

export const getJiraIssuesByQueryId = async (
  params: IGetJiraIssuesByQueryIdParams
) => {
  const { integrationId, id } = params;
  const response = await fetch(
    `${API_URL}/jql?integrationId=${integrationId}&queryId=${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const result = await handleApiResponse(response);

  return result;
};

