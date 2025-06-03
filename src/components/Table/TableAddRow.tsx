import React, { useState } from "react";
import Button from "../../shared/ui/Button";
import Icon from "../../shared/ui/Icon";
import styles from "./index.module.scss";
import { validateRow } from "./utils";
import { ITableColumn } from "./interface";

type Props<T> = {
  columns: ITableColumn<T>[];
  onAdd: (row: Partial<T>) => void;
  onCancel: () => void;
};

export function TableAddRow<T extends { id: number }>({ columns, onAdd, onCancel }: Props<T>) {
  const [rowData, setRowData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInput = (colKey: keyof T, value: string) => {
    setRowData(prev => ({ ...prev, [colKey]: value }));
    setErrors(prev => ({ ...prev, [String(colKey)]: "" }));
  };

  const handleSave = () => {
    const vErrors = validateRow(rowData, columns);
    setErrors(vErrors);
    if (Object.keys(vErrors).length === 0) {
      onAdd(rowData);
    }
  };

  return (
    <tr className={styles.table__row}>
      {columns.map((col) =>
        col.key === "id" ? (
          <td key={String(col.key)} className={styles.table__cell} />
        ) : (
          <td
            key={String(col.key)}
            className={
              styles.table__cell +
              (errors[String(col.key)] ? ` ${styles.table__cell_error}` : "")
            }
          >
            <input
              className={styles.table__input}
              value={(rowData[col.key] as string) ?? ""}
              onChange={e => handleInput(col.key, e.target.value)}
              placeholder="..."
              onClick={e => e.stopPropagation()}
              onFocus={e => e.stopPropagation()}
            />
            {errors[String(col.key)] && (
              <span className={styles.input__error}>{errors[String(col.key)]}</span>
            )}
          </td>
        )
      )}
      <td className={styles.table__cell + " " + styles.table__cell_control + " " + styles.table__cell_sticky}>
        <Button
          typeButton="text-only"
          aria-label="Сохранить"
          onClick={e => {
            e.stopPropagation();
            handleSave();
          }}
          className={styles.table__button}
        >
          <Icon name="done" className={styles.table__icon} />
        </Button>
        <Button
          typeButton="text-only"
          aria-label="Отмена"
          onClick={e => {
            e.stopPropagation();
            onCancel();
          }}
          className={styles.table__button}
        >
          <Icon name="close" className={styles.table__icon} />
        </Button>
      </td>
    </tr>
  );
}