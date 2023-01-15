import { JqlQuery } from "@/types/integrations";
import React from "react";
import JiraQueryListItem from "./JiraQueryListItem";

interface JiraQueryListProps {
  integrationId: string;
  queries: JqlQuery[];
}

const JiraQueryList: React.FC<JiraQueryListProps> = ({
  integrationId,
  queries,
}) => {
  return (
    <div>
      {queries.map(q => (
        <JiraQueryListItem
          key={q.name}
          integrationId={integrationId}
          query={q}
        />
      ))}
    </div>
  );
};

export default JiraQueryList;

