import React from "react";

import JiraLogo from "@/assets/jira-logo.svg";
import { Button } from "@/components/Core";
import { IntegrationView } from "@/types/integrations";

interface JiraPanelProps {
  isEnabled: boolean;
  setView: (view: IntegrationView) => void;
}

const JiraPanel = ({ isEnabled, setView }: JiraPanelProps) => {
  return (
    <>
      <div className="bg-light-buttons dark:bg-dark-buttons flex rounded-md p-4">
        <div className="p-2">
          <JiraLogo />
        </div>
        <div>
          <div className="mb-1 text-2xl font-bold">Jira</div>
          <div className="flex">
            <Button
              disabled={!isEnabled}
              onClick={() => setView(IntegrationView.Config)}
            >
              {!isEnabled ? "Not Configured" : "View Configuration"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JiraPanel;
