import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "ui";
import { getTeam } from "@/api/team";
import { TeamDetails, TeamPageTab } from "@/types/team";
import { FADE_FROM_LEFT, FADE_IN } from "@/utils/variants";
import CreateSessionModal from "@/components/Modals/CreateSessionModal";
import { createSession } from "@/api/session";
import { ROUTE_ROOM } from "@/utils/constants";
import SessionsPanel from "@/components/Teams/SessionsPanel";
import Definitions from "@/components/Teams/Definitions";
import Integrations from "@/components/Teams/Integrations";
import { useTeamStore } from "@/stores/teamStore";

interface TeamPageProps {}

const Team: React.FC<TeamPageProps> = () => {
  const { alias } = useParams();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const { team, setTeam } = useTeamStore();
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

  const fetchTeamData = async (teamAlias: string) => {
    const data = await getTeam(teamAlias);
    setTeam(data);
    setIsLoadingData(false);
  };

  useEffect(() => {
    setIsLoadingData(true);
    if (alias) {
      fetchTeamData(alias);
    }
  }, [alias]);

  if (isLoadingData || !team) return <div>Loading...</div>;

  return (
    <>
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
    </>
  );
};

export default Team;
