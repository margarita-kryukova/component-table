import React, { useEffect, useRef, useState } from "react";
import { IColumn, IRecordType } from "../interfaces";
import styles from "./App.module.scss";
import Loader from "../shared/ui/Loader";
import { Table } from "../components/Table";

const API_URL = "http://localhost:4000/api";
const columns: IColumn[] = [
  { key: "id", title: "Id" },
  {
    key: "name",
    title: "Имя",
    validate: (value: any) => (!value ? "Обязательное поле" : undefined),
  },
  { key: "phone", title: "Телефон" },
  {
    key: "email",
    title: "Email",
    validate: (value: string) =>
      /\S+@\S+\.\S+/.test(value) ? undefined : "Некорректный email",
  },
  {
    key: "age",
    title: "Возраст",
    validate: (value: any) =>
      value && Number(value) >= 18 ? undefined : "Минимум 18 лет",
  },
  { key: "city", title: "Город" },
  { key: "country", title: "Страна" },
  { key: "position", title: "Должность" },
  { key: "company", title: "Компания" },
];

function App() {
  const [data, setData] = useState<IRecordType[]>([]);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
    fetch(`${API_URL}/records`)
      .then((data) => data.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteRecord = async (recordId: IRecordType["id"]) => {
    const response = await fetch(`${API_URL}/records/${recordId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setData((prev) => prev.filter((r) => r.id !== recordId));
    }
  };

  const handleEditRecord = async (
    recordId: IRecordType["id"],
    body: Partial<IRecordType>
  ) => {
    const response = await fetch(`${API_URL}/records/${recordId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const json = await response.json();
      const updateRecord = json.record;
      setData((prev) =>
        prev.map((item) => (item.id === recordId ? updateRecord : item))
      );
    }
  };

  const handleAddRecord = async (body: Partial<IRecordType>) => {
    const response = await fetch(`${API_URL}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const json = await response.json();
      const newRecord = json.record;
      setData((prev) => [...prev, newRecord]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Таблица</h2>
      {loading ? (
        <Loader className={styles.loader} />
      ) : (
        <Table
          data={data}
          columns={columns}
          onClickRow={(record: IRecordType) => console.log("clicked", record)}
          onDeleteRecord={(recordId: number) => handleDeleteRecord(recordId)}
          onEditRecord={(recordId: number, body: Partial<IRecordType>) =>
            handleEditRecord(recordId, body)
          }
          onAddRecord={(body: Partial<IRecordType>) => handleAddRecord(body)}
        />
      )}
    </div>
  );
}

export default App;
