import { Button } from "@/components/Core";
import { IntegrationView } from "@/types/integrations";

interface JiraPanelProps {
  isEnabled: boolean;
  setView: (view: IntegrationView) => void;
}

const JiraPanel = ({ isEnabled, setView }: JiraPanelProps) => {
  return (
    <>
      <div className="flex rounded-md bg-neutral-200 p-4 dark:bg-black">
        <div className="mr-4 py-2">
          <img src="/assets/jira-logo.svg" alt="Jira Logo" />
        </div>
        <div>
          <div className="mb-1 text-2xl font-bold">Jira</div>
          <div className="flex">
            <Button disabled={!isEnabled} onClick={() => setView(IntegrationView.Config)}>
              {!isEnabled ? "Not Configured" : "View Configuration"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JiraPanel;
