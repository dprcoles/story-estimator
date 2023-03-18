import React, { ChangeEventHandler } from "react";

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps {
  label: string;
  description?: string;
  option: SelectOption[];
  onChange: (value: string) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  description,
  option,
  onChange,
  value,
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <div className="my-8">
      <span className="font-medium">{label}</span>
      {description && (
        <div className="text-light-text dark:text-dark-text text-sm mb-2">
          {description}
        </div>
      )}
      <select
        onChange={handleOnChange}
        defaultValue={value}
        className="bg-light-hover dark:bg-dark-hover py-4 px-2 rounded-md w-full"
      >
        {option.map((o) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
