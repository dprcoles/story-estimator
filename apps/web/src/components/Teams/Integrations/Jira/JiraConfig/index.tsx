import React from "react";

import { Button } from "@/components/Core";
import { IntegrationView, JiraIntegration } from "@/types/integrations";

import JiraQueryList from "./JiraQueryList";

interface JiraConfigProps {
  data: JiraIntegration;
  setView: (view: IntegrationView) => void;
}

const JiraConfig = ({ data, setView }: JiraConfigProps) => {
  const { domain, jqlQueries } = data;
  return (
    <div>
      <div className="mb-4 flex">
        <Button onClick={() => setView(IntegrationView.List)}>{"<"} Go Back</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="mb-8">
          <div className="mb-2 text-2xl font-bold">Team Jira Configuration</div>
          <div className="text-black dark:text-white">Domain: {domain}</div>
        </div>
        <div>
          <div className="mb-2 text-2xl font-bold">Saved JQL Queries</div>
          <JiraQueryList integrationId={data.id} queries={jqlQueries} />
        </div>
      </div>
    </div>
  );
};

export default JiraConfig;
