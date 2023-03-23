import { motion } from "framer-motion";
import TeamProvider from "providers/TeamProvider";
import React, { useState } from "react";
import { Tabs } from "ui";

import Definitions from "@/components/Teams/Definitions";
import Integrations from "@/components/Teams/Integrations";
import SessionsPanel from "@/components/Teams/SessionsPanel";
import { useTeamStore } from "@/stores/teamStore";
import { TeamPageTab } from "@/types/team";
import { FADE_FROM_LEFT, FADE_IN } from "@/utils/variants";

const Team: React.FC = () => {
  const { team } = useTeamStore();
  const [tab, setTab] = useState<string>(TeamPageTab.Sessions);

  const tabs = [
    {
      id: TeamPageTab.Sessions,
      label: "Sessions",
    },
    {
      id: TeamPageTab.Definitions,
      label: "Definitions",
    },
    {
      id: TeamPageTab.Integrations,
      label: "Integrations",
    },
  ];
  return (
    <TeamProvider>
      <motion.div variants={FADE_IN} className="max-h-full h-screen">
        <div className="px-2">
          <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
            <div className="p-8">
              <motion.div
                variants={FADE_FROM_LEFT}
                className="font-bold text-5xl mb-8"
              >
                {team.name}
              </motion.div>
              <div className="pb-8">
                <Tabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />
              </div>
              {tab === TeamPageTab.Sessions && (
                <SessionsPanel sessions={team.sessions} />
              )}
              {tab === TeamPageTab.Definitions && <Definitions />}
              {tab === TeamPageTab.Integrations && (
                <Integrations
                  integrations={{
                    jira: team.jiraIntegrationId,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </TeamProvider>
  );
};

export default Team;
