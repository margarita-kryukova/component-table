// Получить строку по событию и mapById
export function getRowByEvent<T extends { id: number }>(
  e: { target: EventTarget | null },
  mapById: Map<number, T>
) {
  let el = e.target as HTMLElement | null;
  while (el) {
    if (el.dataset && el.dataset.id) {
      const id = Number(el.dataset.id);
      return mapById.get(id) || null;
    }
    el = el.parentElement;
  }
  return null;
}

// true если событие пришло с кнопки в управляющей ячейке
export function isEventFromRowControlButton(e: { target: EventTarget | null }) {
  let el = e.target as HTMLElement | null;
  while (el) {
    if (el.closest && el.closest("[data-action],.table__cell_control"))
      return true;
    el = el.parentElement;
  }
  return false;
}

// Валидация
export function validateRow<T>(
  row: Partial<T>,
  columns: {
    key: keyof T;
    title: string;
    validate?: (value: any, record: Partial<T>) => string | undefined;
  }[]
): Record<string, string> {
  const errors: Record<string, string> = {};

  columns.forEach((col) => {
    if (col.key === "id" || !col.validate) return;
    const error = col.validate(row[col.key], row);
    if (error) {
      errors[String(col.key)] = error;
    }
  });

  return errors;
}
