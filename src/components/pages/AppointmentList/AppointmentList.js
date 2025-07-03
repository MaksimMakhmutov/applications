import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./AppointmentList.css";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        { withCredentials: true }
      );
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      alert("Ошибка при загрузке заявок");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="appointment-list-container">
      <h1>Список заявок</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Проблема</th>
              <th>Дата и время</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.problem || "Не указано"}</td>
                <td>{new Date(appointment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
