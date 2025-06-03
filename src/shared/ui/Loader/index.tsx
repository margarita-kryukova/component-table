import React, { FC } from 'react';
import styles from "./index.module.scss";

export interface LoaderProps {
  size?: string;
  color?: string;
  className?: string;
}

const Loader: FC<LoaderProps> = ({ size, color, className = '' }) => {
  const style: React.CSSProperties = {
    '--loader-size': size,
    '--loader-color': color,
  } as any;

  return <div className={`${styles.loader} ${className}`} style={style} />;
};

export default Loader;