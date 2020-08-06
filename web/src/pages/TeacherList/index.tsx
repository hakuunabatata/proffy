import React, { FormEvent, useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import "./styles.css";
import api from "../../services/api";

interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  zipzorp: string;
}

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const subjects = [
    { value: "Artes", label: "Artes" },
    { value: "Biologia", label: "Biologia" },
    { value: "Fisica", label: "Fisica" },
    { value: "Quimica", label: "Quimica" },
    { value: "Matematica", label: "Matematica" },
    { value: "Portugues", label: "Portugues" },
    { value: "Programacao", label: "Programacao" },
    { value: "Ingles", label: "Ingles" },
    { value: "Espanhol", label: "Espanhol" },
    { value: "Geografia", label: "Geografia" },
    { value: "Historia", label: "Historia" },
    { value: "Filosofia", label: "Filosofia" },
    { value: "Sociologia", label: "Sociologia" },
  ];

  const weekdays = [
    { value: "0", label: "domingo" },
    { value: "1", label: "segunda-feira" },
    { value: "2", label: "terca-feira" },
    { value: "3", label: "quarta-feira" },
    { value: "4", label: "quinta-feira" },
    { value: "6", label: "sexta-feira" },
    { value: "7", label: "sabado-feira" },
  ];

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Materia"
            options={subjects}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Select
            name="week_day"
            label="Dia da Semana"
            options={weekdays}
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

export default TeacherList;
