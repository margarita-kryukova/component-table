export interface IRecordType {
  id: number;
  name: string;
  phone: string;
  email: string;
  age: number | null;
  city: string | null;
  country: string | null;
  position: string | null;
  company: string | null;
};

export interface IColumn {
  key: keyof IRecordType;
  title: string;
  validate?: (value: any, record: Partial<IRecordType>) => string | undefined;
}
