import React from "react";
import { motion } from "framer-motion";
import { FADE_UP } from "@/utils/variants";
import Button from "../Button";
import { ReactComponent as JiraLogoSmall } from "@/assets/jira-logo-small.svg";

interface ImportFromJiraButtonProps {
  isEnabled: boolean;
  setIsJiraImportModalOpen: (isJiraImportModalOpen: boolean) => void;
}

const ImportFromJiraButton: React.FC<ImportFromJiraButtonProps> = ({
  isEnabled,
  setIsJiraImportModalOpen,
}) => {
  return (
    <>
      {isEnabled && (
        <motion.div variants={FADE_UP} className="flex mt-8 mx-auto">
          <div className="mx-auto">
            <Button onClick={() => setIsJiraImportModalOpen(true)}>
              <div className="flex items-center">
                <JiraLogoSmall />
                <div className="ml-2 font-medium">Import from Jira</div>
              </div>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ImportFromJiraButton;

