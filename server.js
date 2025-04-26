const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/guess-number', (req, res) => {
    res.sendFile(path.join(__dirname, 'numbers.html'));
});

app.get('/sequence', (req, res) => {
    res.sendFile(path.join(__dirname, 'sequence.html'));
});

app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'images.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});