const express = require('express');
const path = require('path');
const app = express();

// Указываем, где находятся статические файлы
app.use(express.static(path.join(__dirname, ''))); // если index.html и main.js находятся в корневой директории

// Запросы к корню сайта отдают index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
