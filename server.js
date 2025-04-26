const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public/"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','main.html'));
});

app.get('/guess-number', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'numbers.html'));
});

app.get('/sequence', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sequence.html'));
});

app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'images.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
    console.log(`Сервер :${port}`);
});
