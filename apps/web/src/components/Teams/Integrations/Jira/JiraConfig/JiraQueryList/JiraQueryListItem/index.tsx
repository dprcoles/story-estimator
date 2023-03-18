import React, { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { getJiraIssuesByQueryId } from "@/api/integrations";
import { Button } from "ui";
import { JqlQuery } from "@/types/integrations";
import { JiraIssue } from "@/types/jira";
import JiraIssueCard from "../../../JiraIssueCard";

interface JiraQueryListProps {
  integrationId: number;
  query: JqlQuery;
}

const JiraQueryListItem: React.FC<JiraQueryListProps> = ({
  integrationId,
  query,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<JiraIssue[]>([]);

  const fetchResults = async () => {
    setIsLoading(true);
    const res = await getJiraIssuesByQueryId({ integrationId, id: query.id });

    setResults(res);
    setIsLoading(false);
  };

  const handleOnTest = () => {
    setShowResults(true);

    if (results.length === 0) {
      fetchResults();
    }
  };

  const handleOnHide = () => {
    setShowResults(false);
  };

  const { name, query: jql } = query;
  return (
    <div className="bg-light-buttons dark:bg-dark-buttons rounded-md p-4">
      <div className="flex mb-4">
        <div className="text-xl font-bold">{name}</div>
        <div className="flex ml-auto">
          <Button
            onClick={() => {
              showResults ? handleOnHide() : handleOnTest();
            }}
            style="primary"
          >
            {showResults ? "Hide" : "Test"}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md p-2 border border-light-border-color dark:border-dark-border-color bg-light-hover dark:bg-dark-hover">
        <pre>{jql}</pre>
      </div>
      {showResults ? (
        <div className="mt-4 py-2 border-t border-light-border-color dark:border-dark-border-color">
          <div className="flex items-baseline">
            <div className="text-lg font-bold">Results</div>
            <button
              onClick={fetchResults}
              className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 items-center"
            >
              <span className="text-light-text dark:text-dark-text text-2xl">
                <AiOutlineReload className="mx-auto" />
              </span>
            </button>
          </div>
          <div className="py-2 overflow-y-auto max-h-96">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              results.map((x) => (
                <div className="my-2 pr-2">
                  <JiraIssueCard key={x.key} issue={x} />
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JiraQueryListItem;
