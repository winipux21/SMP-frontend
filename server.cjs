const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080; // Новый HTTP-порт

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Сервер фронтенда запущен на порту ${PORT}`);
});
