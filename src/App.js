import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppointmentForm, AppointmentList, Login } from "./components/pages";
import { Navbar } from "./components";

export function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppointmentForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
