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
    <div className="rounded-md bg-neutral-100 p-4 dark:bg-white">
      <div className="mb-4 flex">
        <div className="text-xl font-bold">{name}</div>
        <div className="ml-auto flex">
          <Button
            onClick={() => {
              showResults ? handleOnHide() : handleOnTest();
            }}
            variant="default"
          >
            {showResults ? "Hide" : "Test"}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border border-blue-400 bg-neutral-200 p-2 dark:border-pink-500 dark:bg-zinc-800">
        <pre>{jql}</pre>
      </div>
      {showResults ? (
        <div className="mt-4 border-t border-blue-400 py-2 dark:border-pink-500">
          <div className="flex items-baseline">
            <div className="text-lg font-bold">Results</div>
            <button
              onClick={fetchResults}
              className="ml-auto h-10 w-10 items-center rounded-full hover:bg-neutral-200 dark:hover:bg-zinc-800"
            >
              <span className="text-2xl text-black dark:text-white">
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
