import React from "react";

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

const Select = ({
  label,
  description,
  option,
  onChange,
  value,
}: SelectProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <div className="my-8">
      <span className="font-medium">{label}</span>
      {description && (
        <div className="text-light-text dark:text-dark-text mb-2 text-sm">
          {description}
        </div>
      )}
      <select
        onChange={handleOnChange}
        defaultValue={value}
        className="bg-light-hover dark:bg-dark-hover w-full rounded-md px-2 py-4"
      >
        {option.map((o) => (
          <option value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
