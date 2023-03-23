import React from "react";

import { JqlQuery } from "@/types/integrations";

import JiraQueryListItem from "./JiraQueryListItem";

interface JiraQueryListProps {
  integrationId: number;
  queries: JqlQuery[];
}

const JiraQueryList: React.FC<JiraQueryListProps> = ({
  integrationId,
  queries,
}) => {
  return (
    <div>
      {queries.map((q) => (
        <div key={q.name} className="my-2">
          <JiraQueryListItem integrationId={integrationId} query={q} />
        </div>
      ))}
    </div>
  );
};

export default JiraQueryList;
