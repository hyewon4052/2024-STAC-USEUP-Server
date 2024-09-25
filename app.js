const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const sequelize = require("./config/sequelize");
const cookieParser = require('cookie-parser'); 

const app = express();
app.set('port', process.env.PORT || 5000);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


app.use(cors());

// 정적파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));

// 요청 본문 파서 설정 (JSON 및 URL 인코딩 데이터 처리)
app.use(express.json({ limit : "50mb" }));
app.use(express.urlencoded({ limit:"50mb", extended: false }));

// 쿠키 파서 설정
app.use(cookieParser());

// 세션 설정
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// 라우터 설정
const { CollectRouter, CollectApplyingRouter, CollectSuccessRouter } = require('./routes');
app.use('/collect', CollectRouter);
app.use('/collectapplying', CollectApplyingRouter);
app.use('/collectsuccess', CollectSuccessRouter);

// 기본 라우터 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});