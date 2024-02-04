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
      className={`w-full rounded-md border bg-slate-100 p-2 dark:bg-zinc-900 ${
        selected ? "border-blue-400 dark:border-pink-400" : "border-neutral-100 dark:border-black"
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
            <img height={24} width={24} src={priority.iconUrl} alt="Issue priority icon" />
          </div>
          <div className="hidden font-semibold text-black md:block dark:text-white">{key}</div>
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
          <div className="mx-2 block font-bold text-black md:hidden dark:text-white">{key}</div>
          <div className="ml-auto flex md:hidden">
            <img height={24} width={24} src={priority.iconUrl} alt="Issue priority icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JiraIssueCard;
