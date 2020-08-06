import React from "react";
import zipzorpIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

import "./styles.css";

interface TeacherItemProps {
  teacher: {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    zipzorp: string;
  };
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { id, name, avatar, bio, cost, subject, zipzorp } = props.teacher;

  function createNewConnection() {
    api.post("connection", {
      user_id: id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>
      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {cost},00</strong>
        </p>
        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${zipzorp}`}
        >
          <img src={zipzorpIcon} alt="Zipzorp" />
          Entrar em Contato
        </a>
      </footer>
    </article>
  );
};
export default TeacherItem;
