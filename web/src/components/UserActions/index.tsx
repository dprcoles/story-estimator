import React from "react";
import { FaUserEdit } from "react-icons/fa";
import ActionButton from "../ActionButton";
import ThemeToggle from "../ThemeToggle";

interface UserActionsProps {
  name: string;
  onEdit: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  name,
  onEdit,
  theme,
  setTheme,
}) => {
  return (
    <div className="flex">
      <div className="ml-auto">
        <span className="hidden md:inline font-bold text-lg align-middle pr-2">
          {name}
        </span>
        <ActionButton text={<FaUserEdit />} onClick={onEdit} />
        <span className="ml-2">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </span>
      </div>
    </div>
  );
};

export default UserActions;

