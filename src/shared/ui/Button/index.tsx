import React, { FC, ReactNode } from "react";
import styles from "./index.module.scss";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeButton?: "primary" | "secondary" | "tonal" | "text-only";
  className?: string;
  children: ReactNode;
}

const Button: FC<IButtonProps> = ({ onClick, className = "", children, typeButton = "primary", ...props }) => {
  return (
    <button className={`${styles.button} ${styles[`button_${typeButton}`]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
