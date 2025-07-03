const Appointment = require("../models/Appointment");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  const { name, phone, problem } = req.body;
  try {
    const newAppointment = new Appointment({ name, phone, problem });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
