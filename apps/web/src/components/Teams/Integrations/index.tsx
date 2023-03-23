import React, { useEffect, useState } from "react";

import { getJiraIntegrationById } from "@/api/integrations";
import Loader from "@/components/Loader";
import {
  IntegrationIds,
  IntegrationView,
  JiraIntegration,
} from "@/types/integrations";

import JiraConfig from "./Jira/JiraConfig";
import JiraPanel from "./Jira/JiraPanel";

interface IntegrationsProps {
  integrations: IntegrationIds;
}

const Integrations: React.FC<IntegrationsProps> = ({ integrations }) => {
  const [data, setData] = useState<JiraIntegration | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [view, setView] = useState<IntegrationView>(IntegrationView.List);

  useEffect(() => {
    const fetchIntegrationData = async (id: number) => {
      const res = await getJiraIntegrationById({ id });
      setData(res);
      setIsLoading(false);
    };
    setIsLoading(true);

    if (integrations.jira) {
      fetchIntegrationData(integrations.jira);
    }
  }, [integrations.jira]);

  if (isLoading) return <Loader />;

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
