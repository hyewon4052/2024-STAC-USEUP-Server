// app.js
const express = require('express');
const app = express();
const port = 3000;

// JSON 요청 처리를 위한 미들웨어
app.use(express.json());

// 라우트 연결
const userRoutes = require('./routes/crud');
app.use('/users', userRoutes); // '/users' 경로에서 CRUD API 사용

// 간단한 엔드포인트
app.get('/ping', (req, res) => {
    res.send('pong');
});

// health-check 엔드포인트
app.get('/health-check', (req, res) => {
    res.send('ok');
});

// 서버 시작
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
