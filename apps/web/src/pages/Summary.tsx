import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSession } from "@/api/session";
import Loader from "@/components/Loader";
import SessionSummary from "@/components/SessionSummary";
import { useTeamStore } from "@/stores/teamStore";
import { SessionDetails } from "@/types/session";
import { FADE_IN } from "@/utils/variants";

const SummaryPage = () => {
  const { id } = useParams();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionDetails>();
  const { team, setTeam } = useTeamStore();

  useEffect(() => {
    setIsLoadingData(true);
    if (id) {
      const fetchSessionData = async () => {
        const data = await getSession(parseInt(id, 10));
        setSessionData(data);
        setIsLoadingData(false);

        if (data.team?.id) {
          setTeam({ ...team, id: data.team.id });
        }
      };

      fetchSessionData();
    }
  }, [id]);

  if (isLoadingData || !sessionData)
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <motion.div variants={FADE_IN} className="h-full max-h-[90vh]">
      <div className="px-2">
        <div className="bg-light-panels dark:bg-dark-panels main-panel__container rounded-lg px-8 py-4">
          <SessionSummary session={sessionData} />
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryPage;
