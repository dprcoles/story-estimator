import React from "react";
import { ReactComponent as JiraLogo } from "@/assets/jira-logo.svg";
import Button from "@/components/Button";
import { IntegrationView } from "@/types/integrations";

interface JiraPanelProps {
  isEnabled: boolean;
  setView: (view: IntegrationView) => void;
}

const JiraPanel: React.FC<JiraPanelProps> = ({ isEnabled, setView }) => {
  return (
    <>
      <div className="flex bg-light-buttons dark:bg-dark-buttons rounded-md p-4">
        <div className="p-2">
          <JiraLogo />
        </div>
        <div>
          <div className="text-2xl font-bold mb-1">Jira</div>
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

