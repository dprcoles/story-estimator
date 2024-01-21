import { motion } from "framer-motion";
import TeamProvider from "providers/TeamProvider";
import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Core";
import Integrations from "@/components/Teams/Integrations";
import SessionsPanel from "@/components/Teams/SessionsPanel";
import { useTeamStore } from "@/stores/teamStore";
import { TeamPageTab } from "@/types/team";
import { FADE_FROM_LEFT, FADE_IN } from "@/utils/variants";

const Team = () => {
  const { team } = useTeamStore();
  const [tab, setTab] = useState<string>(TeamPageTab.Sessions);

  const tabs = [
    {
      id: TeamPageTab.Sessions,
      label: "Sessions",
    },
    {
      id: TeamPageTab.Integrations,
      label: "Integrations",
    },
  ];
  return (
    <TeamProvider>
      <motion.div variants={FADE_IN} className="h-screen max-h-full">
        <div className="px-2">
          <div className="main-panel__container rounded-lg bg-neutral-100 px-8 py-4 dark:bg-zinc-900">
            <div className="p-8">
              <motion.h1 variants={FADE_FROM_LEFT} className="mb-8">
                {team.name.split(" ").map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent dark:from-red-600 dark:to-pink-500"
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>
              <Tabs
                value={tab}
                defaultValue={TeamPageTab.Sessions}
                onValueChange={(tab) => setTab(tab)}
              >
                <TabsList className="w-full">
                  {tabs.map((tab) => (
                    <TabsTrigger className="w-full" key={tab.id} value={tab.id}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={TeamPageTab.Sessions}>
                  <SessionsPanel sessions={team.sessions} />
                </TabsContent>
                <TabsContent value={TeamPageTab.Integrations}>
                  <Integrations
                    integrations={{
                      jira: team.jiraIntegrationId,
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </motion.div>
    </TeamProvider>
  );
};

export default Team;
