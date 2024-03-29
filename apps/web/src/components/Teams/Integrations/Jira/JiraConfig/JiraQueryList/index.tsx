import React from "react";

import { JqlQuery } from "@/types/integrations";

import JiraQueryListItem from "./JiraQueryListItem";

interface JiraQueryListProps {
  integrationId: number;
  queries: JqlQuery[];
}

const JiraQueryList = ({ integrationId, queries }: JiraQueryListProps) => {
  return (
    <div>
      {queries &&
        queries.map((q) => (
          <div key={q.name} className="my-2">
            <JiraQueryListItem integrationId={integrationId} query={q} />
          </div>
        ))}
    </div>
  );
};

export default JiraQueryList;
