import React, { useState } from "react";
import { motion } from "framer-motion";
import RoomSettingsModal from "@/components/Modals/RoomSettingsModal";
import { FADE_IN } from "@/utils/variants";
import StoryPanel from "@/components/Panels/StoryPanel";
import PlayerPanel from "@/components/Panels/PlayerPanel";
import MainPanel from "@/components/Panels/MainPanel";
import MobileTabBar, { MobileTabBarType } from "@/components/MobileTabBar";
import AddStoryModal from "@/components/Modals/AddStoryModal";
import { useRoomStore } from "@/stores/roomStore";
import classNames from "classnames";
import RoomProvider from "providers/RoomProvider";

interface RoomPageProps {}

const RoomPage: React.FC<RoomPageProps> = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTabBarType>(
    MobileTabBarType.Estimate,
  );
  const { room } = useRoomStore();

  return (
    <RoomProvider>
      <motion.div variants={FADE_IN} className="max-h-full h-[90vh]">
        <RoomSettingsModal
          isOpen={isSettingsModalOpen}
          setIsOpen={setIsSettingsModalOpen}
        />
        <AddStoryModal
          isOpen={isStoryModalOpen}
          setIsOpen={setIsStoryModalOpen}
        />
        <div className="lg:flex md:space-x-2 min-h-full">
          {room.stories.length > 0 && (
            <div
              className={classNames("hidden lg:max-w-1xl lg:block", {
                block: activeMobileTab === MobileTabBarType.Stories,
              })}
            >
              <StoryPanel setIsStoryModalOpen={setIsStoryModalOpen} />
            </div>
          )}
          <div
            className={classNames("hidden lg:w-full lg:block", {
              block: activeMobileTab === MobileTabBarType.Estimate,
            })}
          >
            <MainPanel
              setIsSettingsModalOpen={setIsSettingsModalOpen}
              setIsStoryModalOpen={setIsStoryModalOpen}
            />
          </div>
          <div
            className={classNames("hidden lg:max-w-1xl lg:block", {
              block: activeMobileTab === MobileTabBarType.Players,
            })}
          >
            <PlayerPanel />
          </div>
        </div>
        <div className="lg:hidden">
          <MobileTabBar
            activeTab={activeMobileTab}
            setActiveTab={setActiveMobileTab}
          />
        </div>
      </motion.div>
    </RoomProvider>
  );
};

export default RoomPage;
