import React, { PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrganisation } from "@/api/organisation";
import Loader from "@/components/Loader";
import { useOrganisationStore } from "@/stores/organisationStore";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";

const OrganisationProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { alias } = useParams();
  const { socket } = useSocketStore();
  const { organisation, setOrganisation } = useOrganisationStore();

  useEffect(() => {
    const fetchOrganisationData = async (teamAlias: string) => {
      const data = await getOrganisation(teamAlias);
      setOrganisation(data);
      setIsLoading(false);
    };

    setIsLoading(true);
    if (alias) {
      fetchOrganisationData(alias);
    }
  }, [alias, setOrganisation]);

  useEffect(() => {
    if (socket && !isLoading && organisation.id) {
      socket.emit(EmitEvent.JoinOrganisation, {
        id: organisation.id,
      });
    }
  }, [isLoading, organisation, socket]);

  if (!socket || isLoading)
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  return <>{children}</>;
};

export default OrganisationProvider;
