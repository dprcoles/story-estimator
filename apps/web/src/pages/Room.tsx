import classNames from "classnames";
import { motion } from "framer-motion";
import RoomProvider from "providers/RoomProvider";
import React, { useState } from "react";

import MobileTabBar, { MobileTabBarType } from "@/components/MobileTabBar";
import AddStoryModal from "@/components/Modals/AddStoryModal";
import MainPanel from "@/components/Panels/MainPanel";
import PlayerPanel from "@/components/Panels/PlayerPanel";
import StoryPanel from "@/components/Panels/StoryPanel";
import { useRoomStore } from "@/stores/roomStore";
import { FADE_IN } from "@/utils/variants";

const RoomPage = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTabBarType>(
    MobileTabBarType.Estimate,
  );
  const { room } = useRoomStore();

  return (
    <RoomProvider>
      <motion.div variants={FADE_IN} className="h-[90vh] max-h-full">
        <AddStoryModal isOpen={isStoryModalOpen} setIsOpen={setIsStoryModalOpen} />
        <div className="min-h-full md:space-x-2 lg:flex">
          {room.stories.length > 0 && (
            <div
              className={classNames("lg:max-w-1xl lg:block", {
                block: activeMobileTab === MobileTabBarType.Stories,
                hidden: activeMobileTab !== MobileTabBarType.Stories,
              })}
            >
              <StoryPanel setIsStoryModalOpen={setIsStoryModalOpen} />
            </div>
          )}
          <div
            className={classNames("lg:block lg:w-full", {
              block: activeMobileTab === MobileTabBarType.Estimate,
              hidden: activeMobileTab !== MobileTabBarType.Estimate,
            })}
          >
            <MainPanel setIsStoryModalOpen={setIsStoryModalOpen} />
          </div>
          <div
            className={classNames("lg:max-w-1xl lg:block", {
              block: activeMobileTab === MobileTabBarType.Players,
              hidden: activeMobileTab !== MobileTabBarType.Players,
            })}
          >
            <PlayerPanel />
          </div>
        </div>
        <div className="lg:hidden">
          <MobileTabBar activeTab={activeMobileTab} setActiveTab={setActiveMobileTab} />
        </div>
      </motion.div>
    </RoomProvider>
  );
};

export default RoomPage;
