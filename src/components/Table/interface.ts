export interface ITableColumn<T> {
  key: keyof T;
  title: string;
  validate?: (value: any, record: Partial<T>) => string | undefined;
}

export interface ITableProps<T extends { id: number }> {
  data: T[];
  columns: ITableColumn<T>[];
  onClickRow?: (record: T) => void;
  onDeleteRecord?: (id: number) => void;
  onEditRecord?: (id: number, body: Partial<T>) => void;
  onAddRecord?: (record: Partial<T>) => void;
  getDefaultRow?: () => Partial<T>;
}

export interface ITableRowProps<T> {
  row: T;
  columns: ITableColumn<T>[];
  isSelected: boolean;
  onEdit?: {
    isEditing: boolean;
    editingData: Partial<T>;
    editingErrors: Record<string, string>;
    onEditChange: (key: keyof T, value: string) => void;
    onEditSave: () => void;
    onEditCancel: () => void;
    onEditStart: () => void;
  };
  onDelete?: () => void;
  withControl: boolean;
};