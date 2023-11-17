import React from 'react';

interface ITextarea {
  classname: string;
  rows: number;
  placeholder: string;
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<ITextarea> = ({
  classname,
  rows,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <textarea
      className={classname}
      rows={rows}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default Textarea;
