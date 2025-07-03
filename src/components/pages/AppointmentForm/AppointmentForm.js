import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./AppointmentForm.css"; // Импортируем файл стилей

export const AppointmentForm = () => {
  const initialValues = {
    name: "",
    phone: "",
    problem: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("ФИО обязательно")
      .min(2, "ФИО должно содержать как минимум 2 символа")
      .matches(
        /^[A-ZА-ЯЁ][a-zа-яё]+(\s[A-ZА-ЯЁ][a-zа-яё]+){1,2}$/,
        'Должно быть в формате "Фамилия Имя Отчество(если есть)" и начинаться с заглавной буквы'
      ),
    phone: Yup.string()
      .required("Номер телефона обязателен")
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        "Введите корректный номер телефона(только цифры)"
      )
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post("http://localhost:5000/api/appointments", values, {
        withCredentials: true,
      });
      alert("Заявка успешно отправлена!");
      resetForm(); // Сбрасываем форму после успешной отправки
    } catch (error) {
      console.error(error);
      alert("Ошибка при отправке заявки");
    } finally {
      setSubmitting(false); // Сбрасываем состояние отправки
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Создать заявку</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field type="text" name="name" placeholder="ФИО" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field type="text" name="phone" placeholder="Номер телефона" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field
                as="textarea"
                name="problem"
                placeholder="Опишите вашу проблему"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
