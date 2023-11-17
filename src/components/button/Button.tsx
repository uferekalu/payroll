import React from 'react';

interface IButton {
  btnClassName: string;
  btnText: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  spanClassName?: string;
  onClick: () => void;
  spanText?: string;
  disabled?: boolean;
  style?: {background: string}
}

const Button: React.FC<IButton> = ({
  btnClassName,
  btnText,
  type,
  spanClassName,
  onClick,
  spanText,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={btnClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
      <span className={spanClassName}>{spanText}</span>
    </button>
  );
};

export default Button;
