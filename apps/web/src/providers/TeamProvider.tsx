import React, { PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTeam } from "@/api/team";
import { useSocketStore } from "@/stores/socketStore";
import { useTeamStore } from "@/stores/teamStore";
import { EmitEvent } from "@/types/server";
import { TeamDetails } from "@/types/team";

const TeamProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { alias } = useParams();
  const { socket } = useSocketStore();
  const { team, setTeam } = useTeamStore();

  useEffect(() => {
    const fetchTeamData = async (teamAlias: string) => {
      const data = await getTeam(teamAlias);
      setTeam(data);
      setIsLoading(false);
    };

    setIsLoading(true);
    if (alias) {
      fetchTeamData(alias);
    }
  }, [alias, setTeam]);

  useEffect(() => {
    if (socket && !isLoading && team.id) {
      socket.emit(EmitEvent.JoinTeam, {
        id: team.id,
      });
    }
  }, [isLoading, team, socket]);

  if (!socket) return <div>Loading...</div>;

  socket.on(EmitEvent.TeamUpdate, (data: TeamDetails) => {
    setTeam(data);
  });

  return <>{children}</>;
};

export default TeamProvider;