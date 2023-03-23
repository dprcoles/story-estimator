import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSession } from "@/api/session";
import SessionSummary from "@/components/SessionSummary";
import { SessionDetails } from "@/types/session";
import { FADE_IN } from "@/utils/variants";

const SummaryPage: React.FC = () => {
  const { id } = useParams();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionDetails>();

  useEffect(() => {
    setIsLoadingData(true);
    if (id) {
      const fetchSessionData = async () => {
        const data = await getSession(parseInt(id, 10));
        setSessionData(data);
        setIsLoadingData(false);
      };

      fetchSessionData();
    }
  }, [id]);

  if (isLoadingData || !sessionData) return <div>Loading...</div>;

  return (
    <motion.div variants={FADE_IN} className="max-h-full h-screen">
      <div className="px-2">
        <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
          <SessionSummary session={sessionData} />
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryPage;
