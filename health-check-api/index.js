const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // MySQL 사용자 이름
    password: 'password',   // MySQL 비밀번호
    database: 'testdb'
  });

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
    }
    console.log('Connected to MySQL');
  });

// JSON 요청 처리를 위한 미들웨어 설정
app.use(express.json());


// /ping 엔드포인트
app.get('/ping', (req, res) => {
    res.send('pong');
});

// /health-check 엔드포인트
app.get('/health-check', (req, res) => {
    res.send('ok');
});


// CRUD 작업을 위한 라우트 설정

// Create
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    connection.query(query, [name, email, age], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ id: results.insertId, name, email, age });
    });
  });
  
// Read
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});
  
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(results[0]);
  });
});
  
// Update
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  connection.query(query, [name, email, age, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ id, name, email, age });
  });
});
  
// Delete
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(204).send();
  });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Health Check API listening at http://localhost:${port}`);
});
