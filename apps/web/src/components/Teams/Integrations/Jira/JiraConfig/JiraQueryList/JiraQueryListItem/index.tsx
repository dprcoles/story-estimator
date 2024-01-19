import React, { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";

import { getJiraIssuesByQueryId } from "@/api/integrations";
import { Button } from "@/components/Core";
import Loader from "@/components/Loader";
import { JqlQuery } from "@/types/integrations";
import { JiraIssue } from "@/types/jira";

import JiraIssueCard from "../../../JiraIssueCard";

interface JiraQueryListProps {
  integrationId: number;
  query: JqlQuery;
}

const JiraQueryListItem = ({ integrationId, query }: JiraQueryListProps) => {
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
      <div className="mb-4 flex">
        <div className="text-xl font-bold">{name}</div>
        <div className="ml-auto flex">
          <Button
            onClick={() => {
              showResults ? handleOnHide() : handleOnTest();
            }}
            color="primary"
          >
            {showResults ? "Hide" : "Test"}
          </Button>
        </div>
      </div>
      <div className="border-light-border-color dark:border-dark-border-color bg-light-hover dark:bg-dark-hover overflow-x-auto rounded-md border p-2">
        <pre>{jql}</pre>
      </div>
      {showResults ? (
        <div className="border-light-border-color dark:border-dark-border-color mt-4 border-t py-2">
          <div className="flex items-baseline">
            <div className="text-lg font-bold">Results</div>
            <button
              onClick={fetchResults}
              className="hover:bg-light-hover dark:hover:bg-dark-hover ml-auto h-10 w-10 items-center rounded-full"
            >
              <span className="text-light-text dark:text-dark-text text-2xl">
                <AiOutlineReload className="mx-auto" />
              </span>
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto py-2">
            {isLoading ? (
              <Loader />
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
