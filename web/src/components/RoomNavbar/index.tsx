import React from "react";
import InviteButton from "../InviteButton";
import UserActions from "../UserActions";

interface RoomNavbarProps {
  description: string;
  name: string;
  setName: (name: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomNavbar: React.FC<RoomNavbarProps> = ({
  description,
  name,
  setName,
  theme,
  setTheme,
}) => {
  return (
    <div className="top-0 z-20 py-2 md:py-6 md:mb-6 px-2 md:px-0">
      <div className="grid grid-cols-3">
        <InviteButton linkToCopy={window.location.href} />
        <span className="p-2 font-bold rounded-md text-center">
          {description}
        </span>
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

