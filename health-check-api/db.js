const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',           // MySQL 사용자 이름
    password: 'password',   // MySQL 비밀번호
    database: 'testdb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = connection; // MySQL 연결을 내보냄