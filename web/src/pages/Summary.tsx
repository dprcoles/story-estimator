import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FADE_IN } from "@/utils/variants";
import { DefaultNavbar } from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";
import { SessionDetails } from "@/types/session";
import { getSession } from "@/api/session";
import SessionSummary from "@/components/SessionSummary";

interface RoomPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const SummaryPage: React.FC<RoomPageProps> = ({ theme, setTheme }) => {
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

  const { stories, players, teamId } = sessionData;

  return (
    <Wrapper>
      <motion.div variants={FADE_IN} className="max-h-full h-screen">
        <div className="p-4 lg:mx-auto">
          <DefaultNavbar theme={theme} setTheme={setTheme} />
        </div>
        <div className="px-2">
          <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
            <SessionSummary
              teamId={teamId}
              players={players}
              stories={stories}
            />
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default SummaryPage;

