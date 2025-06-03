import React from "react";
import styles from "./index.module.scss";
import { ITableColumn } from "./interface";

type Props<T> = {
  columns: ITableColumn<T>[];
  withControl: boolean;
};

export function TableHeader<T>({ columns, withControl }: Props<T>) {
  return (
    <thead className={styles.table__head}>
      <tr className={styles.table__row}>
        {columns.map((col) => (
          <th key={String(col.key)} className={styles.table__cell}>
            {col.title}
          </th>
        ))}
        {withControl && (
          <th className={`${styles.table__cell} ${styles.table__cell_sticky}`}></th>
        )}
      </tr>
    </thead>
  );
}