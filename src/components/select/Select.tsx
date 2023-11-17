import React from 'react';

interface ISelect {
  classname: string;
  text: string | string[];
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultText?: string;
}

const Select: React.FC<ISelect> = ({
  classname,
  text,
  disabled,
  onChange,
  defaultText,
}) => {
  return (
    <select className={classname} disabled={disabled} onChange={onChange}>
      <option value="">{defaultText}</option>
      {Array.isArray(text) &&
        text.map((txt, idx) => (
          <option key={idx} value={txt}>
            {txt}
          </option>
        ))}
    </select>
  );
};

export default Select;
