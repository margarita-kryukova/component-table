import React, { useState, useMemo, useCallback } from "react";
import styles from "./index.module.scss";
import Button from "../../shared/ui/Button";
import Icon from "../../shared/ui/Icon";
import {
  getRowByEvent,
  isEventFromRowControlButton,
  validateRow,
} from "./utils";
import { ITableProps } from "./interface";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableAddRow } from "./TableAddRow";

export function Table<T extends { id: number }>({
  data,
  columns,
  onClickRow,
  onDeleteRecord,
  onEditRecord,
  onAddRecord,
}: ITableProps<T>) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<T>>({});
  const [editingErrors, setEditingErrors] = useState<Record<string, string>>(
    {}
  );

  const mapById = useMemo(() => {
    const map = new Map<number, T>();
    data.forEach((item) => map.set(item.id, item));
    return map;
  }, [data]);

  const withControl = !!onEditRecord || !!onDeleteRecord;

  const handleTbodyClick = useCallback(
    (e: React.MouseEvent<HTMLTableSectionElement>) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button[data-action]");
      if (button) {
        e.stopPropagation();
        const row = getRowByEvent(e, mapById);
        if (row) {
          const action = button.getAttribute("data-action");
          if (onDeleteRecord && action === "delete") {
            onDeleteRecord(row.id);
          }
          if (onEditRecord && action === "edit") {
            setEditingId(row.id);
            setEditingData({ ...row });
            setEditingErrors({});
          }
        }
        return;
      }
      const row = getRowByEvent(e, mapById);
      if (row) {
        setSelectedId(row.id);
        onClickRow?.(row);
      }
    },
    [mapById, onClickRow, onDeleteRecord, onEditRecord]
  );

  const handleEditSave = useCallback(() => {
    if (editingId == null) return;
    const errors = validateRow(editingData, columns);
    setEditingErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (onEditRecord) {
      onEditRecord(editingId, { ...mapById.get(editingId), ...editingData });
    }
    setEditingId(null);
    setEditingData({});
    setEditingErrors({});
  }, [columns, editingData, editingId, mapById, onEditRecord]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableSectionElement>) => {
      if (editingId !== null && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleEditSave();
        return;
      }
      if (e.key === "Enter") {
        if (isEventFromRowControlButton(e)) return;
        const row = getRowByEvent(e, mapById);
        if (row) {
          setSelectedId(row.id);
          onClickRow?.(row);
        }
      }
    },
    [editingId, handleEditSave, onClickRow, mapById]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTableSectionElement>) => {
      if (isEventFromRowControlButton(e)) return;
      const row = getRowByEvent(e, mapById);
      if (row) setSelectedId(row.id);
    },
    [mapById]
  );

  const handleEditChange = (key: keyof T, value: string) => {
    setEditingData((prev) => ({ ...prev, [key]: value }));
    setEditingErrors((prev) => ({ ...prev, [String(key)]: "" }));
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingData({});
    setEditingErrors({});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <table className={styles.table}>
          <TableHeader columns={columns} withControl={withControl} />
          <tbody
            onClick={handleTbodyClick}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
          >
            {data.map((row) => {
              const withEdit = onEditRecord
                ? {
                    isEditing: row.id === editingId,
                    editingData: editingData,
                    editingErrors: editingErrors,
                    onEditChange: handleEditChange,
                    onEditSave: handleEditSave,
                    onEditCancel: handleEditCancel,
                    onEditStart: () => {
                      setEditingId(row.id);
                      setEditingData({ ...row });
                      setEditingErrors({});
                    },
                  }
                : undefined;
              const withDelete = onDeleteRecord ? () => onDeleteRecord(row.id) : undefined;
              return (
                <TableRow
                  key={row.id}
                  row={row}
                  columns={columns}
                  isSelected={row.id === selectedId}
                  withControl={withControl}
                  onEdit={withEdit}
                  onDelete={withDelete}
                />
              );
            })}
            {isAdding && onAddRecord && (
              <TableAddRow
                columns={columns}
                onAdd={(row) => {
                  onAddRecord(row);
                  setIsAdding(false);
                }}
                onCancel={() => setIsAdding(false)}
              />
            )}
          </tbody>
        </table>
      </div>
      {onAddRecord && (
        <Button
          typeButton="text-only"
          className={styles["add-button"]}
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          <Icon name="add" />
        </Button>
      )}
    </div>
  );
}
