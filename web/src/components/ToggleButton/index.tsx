import React from "react";

interface ToggleButtonProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean | undefined;
  setChecked: (checked: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  id,
  label,
  description,
  checked,
  setChecked,
}) => {
  return (
    <div className="my-8">
      <div className="flex items-center">
        <span className="font-medium">{label}</span>
        <label htmlFor={id} className="ml-auto cursor-pointer">
          <div className="toggle-button relative">
            <input
              type="checkbox"
              id={id}
              className="sr-only"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <div className="block bg-light-hover dark:bg-dark-hover w-14 h-8 rounded-full"></div>
            <div className="dot absolute left-1 top-1 bg-light-text dark:bg-dark-text w-6 h-6 rounded-full transition"></div>
          </div>
        </label>
      </div>
      {description && (
        <div className="text-light-text dark:text-dark-text text-sm w-10/12">
          {description}
        </div>
      )}
    </div>
  );
};

export default ToggleButton;

