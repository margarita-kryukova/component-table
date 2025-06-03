import React from "react";
import Button from "../../shared/ui/Button";
import Icon from "../../shared/ui/Icon";
import styles from "./index.module.scss";
import { ITableRowProps } from "./interface";

export function TableRow<T extends { id: number }>(props: ITableRowProps<T>) {
  const {
    row,
    columns,
    isSelected,
    onEdit,
    onDelete,
    withControl,
  } = props;

  return (
    <tr
      className={
        styles.table__row + (isSelected ? ` ${styles.table__row_selected}` : "")
      }
      data-id={row.id}
      tabIndex={0}
    >
      {columns.map((col) =>
        onEdit?.isEditing && col.key !== "id" ? (
          <td
            key={String(col.key)}
            className={
              styles.table__cell +
              (onEdit?.editingErrors[String(col.key)]
                ? ` ${styles.table__cell_error}`
                : "")
            }
          >
            <input
              className={styles.table__input}
              value={(onEdit?.editingData[col.key] as string) ?? ""}
              onChange={(e) => onEdit?.onEditChange(col.key, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              placeholder="..."
            />
            {onEdit?.editingErrors[String(col.key)] && (
              <span className={styles.input__error}>
                {onEdit?.editingErrors[String(col.key)]}
              </span>
            )}
          </td>
        ) : (
          <td key={String(col.key)} className={styles.table__cell}>
            {row[col.key] as React.ReactNode}
          </td>
        )
      )}
      {withControl && (
        <td
          className={`${styles.table__cell} ${styles.table__cell_control} ${styles.table__cell_sticky}`}
        >
          {onEdit?.isEditing ? (
            <>
              <Button
                typeButton="text-only"
                className={styles.table__button}
                aria-label="Сохранить"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.onEditSave();
                }}
              >
                <Icon name="done" className={styles.table__icon} />
              </Button>
              <Button
                typeButton="text-only"
                className={styles.table__button}
                aria-label="Отмена"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.onEditCancel();
                }}
              >
                <Icon name="close" className={styles.table__icon} />
              </Button>
            </>
          ) : (
            <>
              {onEdit?.onEditStart ? (
                <Button
                  typeButton="text-only"
                  className={styles.table__button}
                  aria-label="Редактировать"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit.onEditStart();
                  }}
                >
                  <Icon name="edit" className={styles.table__icon} />
                </Button>
              ) : null}
              {onDelete ? (
                <Button
                  typeButton="text-only"
                  className={styles.table__button}
                  aria-label="Удалить"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Icon name="delete" className={styles.table__icon} />
                </Button>
              ) : null}
            </>
          )}
        </td>
      )}
    </tr>
  );
}
