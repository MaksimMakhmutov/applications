const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [
  {
    email: "admin@example.com",
    password: "$2b$10$HWAqEFL0OhfEX1SwLpnkXO9IOD72oxNq7rebkVh4hQD5BovIzQHEi", // Хэшированный пароль для "password"
  },
];

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Неверные учетные данные" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Неверные учетные данные" });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Успешный вход" });
};
