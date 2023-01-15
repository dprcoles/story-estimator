import React from "react";
import { JiraIssue } from "@/types/jira";

interface JiraIssueCardProps {
  issue: JiraIssue;
}

const JiraIssueCard: React.FC<JiraIssueCardProps> = ({ issue }) => {
  const { key, priority, status, summary, type } = issue;
  return (
    <div className="p-2 w-full rounded-md border border-light-border-color dark:border-dark-border-color bg-light-panels dark:bg-dark-panels">
      <div className="grid grid-cols-1">
        <div className="flex space-x-0 md:space-x-2 items-center pb-4">
          <img
            height={24}
            width={24}
            src={type.iconUrl}
            alt="Issue type icon"
            className="hidden md:block"
          />
          <div className="hidden md:block font-bold text-light-text dark:text-dark-text">
            {key}
          </div>
          <div className="font-bold">{summary}</div>
        </div>
        <div className="flex items-center">
          <img
            height={24}
            width={24}
            src={type.iconUrl}
            alt="Issue type icon"
            className="block md:hidden"
          />
          <div className="block md:hidden mx-2 font-bold text-light-text dark:text-dark-text">
            {key}
          </div>
          <div className="px-2 py-1 bg-light-hover dark:bg-dark-hover rounded-md text-sm">
            {status.statusCategory.name}
          </div>
          <div className="flex ml-auto">
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

