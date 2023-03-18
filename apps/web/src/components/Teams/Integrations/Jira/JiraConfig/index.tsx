import { Button } from "ui";
import { IntegrationView, JiraIntegration } from "@/types/integrations";
import React from "react";
import JiraQueryList from "./JiraQueryList";

interface JiraConfigProps {
  data: JiraIntegration;
  setView: (view: IntegrationView) => void;
}

const JiraConfig: React.FC<JiraConfigProps> = ({ data, setView }) => {
  const { domain, jqlQueries } = data;
  return (
    <div>
      <div className="flex mb-4">
        <Button onClick={() => setView(IntegrationView.List)}>
          {"<"} Go Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="mb-8">
          <div className="text-2xl font-bold mb-2">Team Jira Configuration</div>
          <div className="text-light-text dark:text-dark-text">
            Domain: {domain}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mb-2">Saved JQL Queries</div>
          <JiraQueryList integrationId={data.id} queries={jqlQueries} />
        </div>
      </div>
    </div>
  );
};

export default JiraConfig;
