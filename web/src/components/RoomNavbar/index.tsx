import React from "react";
import InviteButton from "../InviteButton";
import StoryDescription from "../StoryDescription";
import UserActions from "../UserActions";

interface RoomNavbarProps {
  description: string;
  setDescription: (description: string) => void;
  name: string;
  setName: (name: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomNavbar: React.FC<RoomNavbarProps> = ({
  description,
  setDescription,
  name,
  setName,
  theme,
  setTheme,
}) => {
  return (
    <div className="top-0 z-20 py-2 md:py-6 md:mb-6 px-2 md:px-0">
      <div className="flex mx-auto lg:max-w-5xl items-center justify-between">
        <InviteButton linkToCopy={window.location.href} />
        <StoryDescription
          description={description}
          setDescription={setDescription}
        />
        <UserActions
          name={name}
          onEdit={() => setName("")}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    </div>
  );
};

export default RoomNavbar;

