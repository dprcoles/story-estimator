import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSession } from "@/api/session";
import Loader from "@/components/Loader";
import SessionSummary from "@/components/SessionSummary";
import { useTeamStore } from "@/stores/teamStore";
import { SessionDetails } from "@/types/session";
import { FADE_IN } from "@/utils/variants";

const SummaryPage: React.FC = () => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoadingData || !sessionData)
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <motion.div variants={FADE_IN} className="max-h-[90vh] h-full">
      <div className="px-2">
        <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
          <SessionSummary session={sessionData} />
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryPage;
