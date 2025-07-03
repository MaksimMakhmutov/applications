const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.error(err));

// Импорт маршрутов
const appointmentRoutes = require("./routes/appointments");
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
