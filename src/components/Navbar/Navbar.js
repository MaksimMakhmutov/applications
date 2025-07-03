import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Импортируем стили

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Создать заявку</Link>
        </li>
        <li>
          <Link to="/appointments">Список заявок</Link>
        </li>
        <li>
          <Link to="/login">Вход</Link>
        </li>
      </ul>
    </nav>
  );
}
