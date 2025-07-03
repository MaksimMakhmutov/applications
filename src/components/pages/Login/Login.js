import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./Login.css"; // Импортируем файл стилей

// Схема валидации с помощью yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Пароль обязателен"),
});

export const Login = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setError("");
    const { email, password } = values;

    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      alert("Вы успешно вошли!");
      window.location.href = "/appointments";
    } catch (error) {
      setError("Ошибка при входе. Проверьте ваши учетные данные.");
    }
  };

  return (
    <div className="login-container">
      <h2>Вход в систему</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="btn btn-primary">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
