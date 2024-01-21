import React, { useEffect, useState } from "react";

import { getJiraIntegrationById, getJiraIssuesByQueryId } from "@/api/integrations";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Core";
import Loader from "@/components/Loader";
import JiraIssueCard from "@/components/Teams/Integrations/Jira/JiraIssueCard";
import { JqlQuery } from "@/types/integrations";
import { JiraIssue } from "@/types/jira";
import { Story } from "@/types/story";
import { DEFAULT_STORY } from "@/utils/constants";

interface JiraImportTabProps {
  integrationId?: number;
  setStories: (stories: Story[]) => void;
  isOpen: boolean;
}

const JiraImportTab = ({ integrationId, setStories, isOpen }: JiraImportTabProps) => {
  const [isLoadingQueries, setIsLoadingQueries] = useState<boolean>(false);
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(false);
  const [queries, setQueries] = useState<JqlQuery[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState<number>(0);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [selectedIssueKeys, setSelectedIssueKeys] = useState<string[]>([]);

  const fetchIssues = async () => {
    if (!integrationId || !selectedQueryId) {
      return;
    }

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
    if (!integrationId) {
      return;
    }

    const fetchQueries = async () => {
      const res = await getJiraIntegrationById({ id: integrationId });
      setQueries(res.jqlQueries);
      setIsLoadingQueries(false);
    };

    if (queries.length === 0 && integrationId) {
      setIsLoadingQueries(true);
      fetchQueries();
    }
  }, [integrationId, queries]);

  useEffect(() => {
    if (isOpen && selectedIssueKeys.length > 0) {
      setStories([...selectedIssueKeys.map((x) => ({ ...DEFAULT_STORY, description: x }))]);
      return;
    }

    setStories([]);
  }, [isOpen, selectedIssueKeys, setStories]);

  return (
    <>
      {!isLoadingQueries && (
        <div className="flex gap-2 px-2">
          <Select
            onValueChange={(value) => setSelectedQueryId(parseInt(value, 10))}
            value={selectedQueryId.toString()}
            defaultValue={selectedQueryId.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a query to fetch issues..." />
            </SelectTrigger>
            <SelectContent>
              {queries.map((q) => (
                <SelectItem key={q.id} value={q.id.toString()}>
                  {q.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button disabled={selectedQueryId === 0} onClick={handleFetchIssues} variant="default">
            Run
          </Button>
        </div>
      )}
      <div className="max-h-96 overflow-y-auto px-2 pt-4">
        {isLoadingIssues && <Loader />}
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
              <JiraIssueCard issue={x} selected={selectedIssueKeys.includes(x.key)} />
            </div>
          ))}
      </div>
    </>
  );
};

export default JiraImportTab;
