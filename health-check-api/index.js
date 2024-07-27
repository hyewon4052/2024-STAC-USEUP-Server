const express = require('express');
const app = express();
const port = 3000;

// /ping 엔드포인트
app.get('/ping', (req, res) => {
    res.send('pong');
});

// /health-check 엔드포인트
app.get('/health-check', (req, res) => {
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Health Check API listening at http://localhost:${port}`);
});
