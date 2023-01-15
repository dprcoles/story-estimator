import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button, { ButtonStyle } from "@/components/Button";
import { JqlQuery } from "@/types/integrations";
import {
  getJiraIntegrationById,
  getJiraIssuesByQueryId,
} from "@/api/integrations";
import { JiraIssue } from "@/types/jira";
import JiraIssueCard from "../Teams/Integrations/Jira/JiraIssueCard";

interface JiraImportModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  integrationId: string;
  handleImport: (issues: JiraIssue[]) => void;
}

const JiraImportModal: React.FC<JiraImportModalProps> = ({
  isOpen,
  setIsOpen,
  integrationId,
  handleImport,
}) => {
  const [isLoadingQueries, setIsLoadingQueries] = useState<boolean>(false);
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(false);
  const [queries, setQueries] = useState<JqlQuery[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState<string>("");
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [selectedIssueKeys, setSelectedIssueKeys] = useState<string[]>([]);

  const fetchQueries = async () => {
    const res = await getJiraIntegrationById({ id: integrationId });
    setQueries(res.jqlQueries);
    setIsLoadingQueries(false);
  };

  const fetchIssues = async () => {
    setIsLoadingIssues(true);
    const res: JiraIssue[] = await getJiraIssuesByQueryId({
      integrationId,
      id: selectedQueryId,
    });

    setIssues(res);

    setSelectedIssueKeys(res.map(x => x.key));

    setIsLoadingIssues(false);
  };

  const handleFetchIssues = () => {
    fetchIssues();
  };

  const handleOnSelect = (issueKey: string, checked: boolean) => {
    setSelectedIssueKeys(
      checked
        ? [...selectedIssueKeys, issueKey]
        : [...selectedIssueKeys.filter(x => x !== issueKey)]
    );
  };

  const handleOnImport = () => {
    handleImport(issues.filter(x => selectedIssueKeys.includes(x.key)));
  };

  const handleOnImportAll = () => {
    handleImport(issues);
  };

  useEffect(() => {
    if (isOpen && queries.length === 0) {
      setIsLoadingQueries(true);
      fetchQueries();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <>
          <div className="max-w-5xl mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-6 min-w-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-light-panels dark:bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-light-buttons dark:border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">Import from Jira</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                  >
                    <span className="text-light-text dark:text-dark-text text-2xl">
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                {!isLoadingQueries && (
                  <div className="p-4 flex-auto">
                    <div className="pb-2 font-medium">
                      Select a query to fetch issues
                    </div>
                    <div className="flex justify-between">
                      <select
                        className="p-2 mr-4 md:w-96 rounded-md border border-light-border-color dark:border-dark-border-color bg-light-panels dark:bg-dark-panels"
                        value={selectedQueryId}
                        onChange={e => setSelectedQueryId(e.target.value)}
                      >
                        <option value="">Select a query...</option>
                        {queries.map(q => (
                          <option key={q.id} value={q.id}>
                            {q.name}
                          </option>
                        ))}
                      </select>
                      <Button
                        disabled={selectedQueryId === ""}
                        onClick={handleFetchIssues}
                      >
                        Run
                      </Button>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  {isLoadingIssues && (
                    <div className="text-center">Loading...</div>
                  )}
                  {!isLoadingIssues &&
                    issues.length > 0 &&
                    issues.map(x => (
                      <div key={x.key} className="flex items-center py-1">
                        <div className="px-2">
                          <input
                            type="checkbox"
                            checked={selectedIssueKeys.includes(x.key)}
                            onChange={e =>
                              handleOnSelect(x.key, e.target.checked)
                            }
                          />
                        </div>
                        <JiraIssueCard issue={x} />
                      </div>
                    ))}
                </div>
                <div className="flex p-6 border-t border-solid border-light-buttons dark:border-dark-buttons rounded-b">
                  <div className="flex ml-auto space-x-2">
                    <Button
                      onClick={handleOnImport}
                      disabled={selectedIssueKeys.length === 0}
                      style={ButtonStyle.Primary}
                    >
                      Import {selectedIssueKeys.length} selected
                    </Button>
                    <Button
                      onClick={handleOnImportAll}
                      disabled={issues.length === 0}
                      style={ButtonStyle.Primary}
                    >
                      Import all
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default JiraImportModal;

