import React from "react";
import { FaUserEdit } from "react-icons/fa";
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
        <span className="font-bold text-lg align-middle">{name}</span>
        <span className="ml-2">
          <button
            className="align-middle items-center p-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary rounded-md shadow-sm ease-linear transition-all duration-150"
            onClick={onEdit}
          >
            <FaUserEdit />
          </button>
        </span>
        <span className="ml-2">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </span>
      </div>
    </div>
  );
};

export default UserActions;

