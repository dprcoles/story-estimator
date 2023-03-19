import React, { useEffect, useState } from "react";
import JiraPanel from "./Jira/JiraPanel";
import JiraConfig from "./Jira/JiraConfig";
import {
  IntegrationIds,
  IntegrationView,
  JiraIntegration,
} from "@/types/integrations";
import { getJiraIntegrationById } from "@/api/integrations";

interface IntegrationsProps {
  integrations: IntegrationIds;
}

const Integrations: React.FC<IntegrationsProps> = ({ integrations }) => {
  const [data, setData] = useState<JiraIntegration | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [view, setView] = useState<IntegrationView>(IntegrationView.List);

  const fetchIntegrationData = async (id: number) => {
    const res = await getJiraIntegrationById({ id });
    setData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    if (integrations.jira) {
      fetchIntegrationData(integrations.jira);
    }
  }, []);

  return (
    <div>
      {view === IntegrationView.List && (
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <JiraPanel
              isEnabled={Boolean(integrations.jira)}
              setView={setView}
            />
          </div>
        </div>
      )}
      {data && view === IntegrationView.Config && (
        <div>
          <JiraConfig data={data} setView={setView} />
        </div>
      )}
    </div>
  );
};

export default Integrations;
