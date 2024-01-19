import React from "react";

import { JiraIssue } from "@/types/jira";

interface JiraIssueCardProps {
  issue: JiraIssue;
  selected?: boolean;
}

const JiraIssueCard = ({ issue, selected }: JiraIssueCardProps) => {
  const { key, priority, summary, type } = issue;
  return (
    <div
      className={`bg-light-panels dark:bg-dark-panels w-full rounded-md border p-2 ${
        selected
          ? "border-light-border-color dark:border-dark-border-color"
          : "border-light-buttons dark:border-dark-buttons"
      }`}
    >
      <div className="grid w-full grid-cols-1">
        <div className="flex items-center space-x-0 md:space-x-2">
          <img
            height={24}
            width={24}
            src={type.iconUrl}
            alt="Issue type icon"
            className="hidden md:block"
          />
          <div className="ml-auto hidden md:flex">
            <img
              height={24}
              width={24}
              src={priority.iconUrl}
              alt="Issue priority icon"
            />
          </div>
          <div className="text-light-text dark:text-dark-text hidden font-semibold md:block">
            {key}
          </div>
          <div className="font-semibold">{summary}</div>
        </div>
        <div className="flex items-center">
          <img
            height={24}
            width={24}
            src={type.iconUrl}
            alt="Issue type icon"
            className="block md:hidden"
          />
          <div className="text-light-text dark:text-dark-text mx-2 block font-bold md:hidden">
            {key}
          </div>
          <div className="ml-auto flex md:hidden">
            <img
              height={24}
              width={24}
              src={priority.iconUrl}
              alt="Issue priority icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JiraIssueCard;
