import React, { useEffect, useState } from "react";
import { Button } from "ui";
import {
  getJiraIntegrationById,
  getJiraIssuesByQueryId,
} from "@/api/integrations";
import JiraIssueCard from "@/components/Teams/Integrations/Jira/JiraIssueCard";
import { JqlQuery } from "@/types/integrations";
import { JiraIssue } from "@/types/jira";
import { Story } from "@/types/story";
import { DEFAULT_STORY } from "@/utils/constants";

interface JiraImportTabProps {
  integrationId: number;
  setStories: (stories: Story[]) => void;
  isOpen: boolean;
}

const JiraImportTab: React.FC<JiraImportTabProps> = ({
  integrationId,
  setStories,
  isOpen,
}) => {
  const [isLoadingQueries, setIsLoadingQueries] = useState<boolean>(false);
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(false);
  const [queries, setQueries] = useState<JqlQuery[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState<number>(0);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [selectedIssueKeys, setSelectedIssueKeys] = useState<string[]>([]);

  const fetchQueries = async () => {
    const res = await getJiraIntegrationById({ id: integrationId });
    setQueries(res.jqlQueries);
    setIsLoadingQueries(false);
  };

  const fetchIssues = async () => {
    setIsLoadingIssues(true);
    const res: JiraIssue[] = await getJiraIssuesByQueryId({
      integrationId,
      id: selectedQueryId,
    });

    setIssues(res);

    setSelectedIssueKeys(res.map((x) => x.key));

    setIsLoadingIssues(false);
  };

  const handleFetchIssues = () => {
    fetchIssues();
  };

  const handleOnSelect = (issueKey: string, checked: boolean) => {
    setSelectedIssueKeys(
      checked
        ? [...selectedIssueKeys, issueKey]
        : [...selectedIssueKeys.filter((x) => x !== issueKey)],
    );
  };

  useEffect(() => {
    if (queries.length === 0 && integrationId) {
      setIsLoadingQueries(true);
      fetchQueries();
    }
  }, [integrationId]);

  useEffect(() => {
    if (isOpen && selectedIssueKeys.length > 0) {
      setStories([
        ...selectedIssueKeys.map((x) => ({ ...DEFAULT_STORY, description: x })),
      ]);
      return;
    }

    setStories([]);
  }, [isOpen, selectedIssueKeys]);

  return (
    <>
      {!isLoadingQueries && (
        <div className="flex-auto">
          <div className="flex">
            <select
              className="p-2 mr-4 w-full md:w-96 rounded-md border border-light-border-color dark:border-dark-border-color bg-light-panels dark:bg-dark-panels"
              value={selectedQueryId.toString()}
              onChange={(e) => setSelectedQueryId(parseInt(e.target.value, 10))}
            >
              <option value="">Select a query to fetch issues...</option>
              {queries.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.name}
                </option>
              ))}
            </select>
            <Button
              disabled={selectedQueryId === 0}
              onClick={handleFetchIssues}
            >
              Run
            </Button>
          </div>
        </div>
      )}
      <div className="p-4 overflow-y-auto max-h-96">
        {isLoadingIssues && <div className="text-center">Loading...</div>}
        {!isLoadingIssues &&
          issues.length > 0 &&
          issues.map((x) => (
            <div key={x.key} className="flex items-center py-1">
              <div className="px-2">
                <input
                  type="checkbox"
                  checked={selectedIssueKeys.includes(x.key)}
                  onChange={(e) => handleOnSelect(x.key, e.target.checked)}
                />
              </div>
              <JiraIssueCard
                issue={x}
                selected={selectedIssueKeys.includes(x.key)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default JiraImportTab;
