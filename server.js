const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const records = [
  {
    id: 1,
    name: "Alice Johnson",
    phone: "+1-202-555-0115",
    email: "alice.johnson@example.com",
    age: 28,
    city: "New York",
    country: "USA",
    position: "Software Engineer",
    company: "TechCorp",
  },
  {
    id: 2,
    name: "Bob Smith",
    phone: "+44 7911 123456",
    email: "bob.smith@example.co.uk",
    age: 35,
    city: "London",
    country: "UK",
    position: "Product Manager",
    company: "InnoGoods Ltd.",
  },
  {
    id: 3,
    name: "Carla González",
    phone: "+34 612 345 678",
    email: "carla.gonzalez@example.es",
    age: 42,
    city: "Madrid",
    country: "Spain",
    position: null,
    company: null,
  },
  {
    id: 4,
    name: "David Li",
    phone: "+86 10 8888 9999",
    email: "david.li@example.cn",
    age: null,
    city: "Beijing",
    country: "China",
    position: "Data Analyst",
    company: "Beijing Data Co.",
  },
  {
    id: 5,
    name: "Emma Müller",
    phone: "+49 30 123456",
    email: "emma.mueller@example.de",
    age: 30,
    city: null,
    country: "Germany",
    position: "UX Designer",
    company: "DesignWerk",
  },
  {
    id: 6,
    name: "Faisal Khan",
    phone: "+91 98765 43210",
    email: "faisal.khan@example.in",
    age: 25,
    city: "Mumbai",
    country: "India",
    position: "Marketing Specialist",
    company: "GlobalReach",
  },
];
let nextId = 7;

app.use(cors());
app.use(express.json());

// records
app.get("/api/records", (req, res) => {
  res.json(records);
});

app.post("/api/records", (req, res) => {
  const newData = req.body;
  const newRecord = {
    ...newData,
    id: nextId++,
  };
  records.push(newRecord);
  res.status(201).json({ success: true, record: newRecord });
});

app.patch("/api/records/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;
  const index = records.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Record not found" });
  }

  records[index] = {
    ...records[index],
    ...updatedData,
    id,
  };

  res.json({ success: true, record: records[index] });
});

app.delete("/api/records/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Record not found" });
    return;
  }
  const deleted = records.splice(index, 1)[0];
  res.json({ success: true, deleted });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
