import React from "react";

interface SwitchProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean | undefined;
  setChecked: (checked: boolean) => void;
}

const Switch = ({
  id,
  label,
  description,
  checked,
  setChecked,
}: SwitchProps) => {
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
            <div className="bg-light-hover dark:bg-dark-hover block h-8 w-14 rounded-full"></div>
            <div className="dot bg-light-text dark:bg-dark-text absolute left-1 top-1 h-6 w-6 rounded-full transition"></div>
          </div>
        </label>
      </div>
      {description && (
        <div className="text-light-text dark:text-dark-text w-10/12 text-sm">
          {description}
        </div>
      )}
    </div>
  );
};

export default Switch;
