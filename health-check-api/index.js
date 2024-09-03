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
// 고객 정보
app.post('/users', (req, res) => {
    const { id, pw, nickname } = req.body;
    const query = 'INSERT INTO users (id, pw, nickname) VALUES (?, ?, ?)';
    connection.query(query, [id, pw, nickname], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ id: results.insertId, pw, nickname });
    });
  });

// 수거 정보 
app.post('/users', (req, res) => {
    const { addr, de_addr, status, acc_at, pickup_at } = req.body;
    const query = 'INSERT INTO users (addr, de_addr, status, acc_at, pickup_at) VALUES (?, ?, ?)';
    connection.query(query, [addr, de_addr, status, acc_at, pickup_at], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ addr, de_addr, status, acc_at, pickup_at });
    });
  });

// 구매 정보 
app.post('/users', (req, res) => {
    const { addr, de_addr, deli_status, pur_at } = req.body;
    const query = 'INSERT INTO users (product, addr, de_addr, deli_status, pur_at) VALUES (?, ?, ?)';
    connection.query(query, [addr, de_addr, deli_status, pur_at], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ addr, de_addr, deli_status, pur_at });
    });
  });

// 제품 등록
app.post('/users', (req, res) => {
  const { product, price, product_status } = req.body;
  const query = 'INSERT INTO users (product, addr, de_addr, deli_status, pur_at) VALUES (?, ?, ?)';
  connection.query(query, [product, price, product_status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ product, price, product_status });
  });
});
  
// Read
// app.get('/users', (req, res) => {
//   const query = 'SELECT * FROM users';
//   connection.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.status(200).send(results);
//   });
// });
  
// app.get('/users/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM users WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     if (results.length === 0) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.status(200).send(results[0]);
//   });
// });
  
// Update
//고객 정보(포인트)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { point } = req.body;
  const query = 'UPDATE users SET point = ?';
  connection.query(query, [point], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ point });
  });
});

//수거 정보(주소, 수거 상태)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { addr, de_addr, status } = req.body;
  const query = 'UPDATE users SET addr = ?, de_addr = ?, status = ?';
  connection.query(query, [addr, de_addr, status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ addr, de_addr, status });
  });
});

//구매 정보(주소, 배송 상태)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { addr, de_addr, deli_status } = req.body;
  const query = 'UPDATE users SET addr = ?, de_addr = ?, deli_status = ?';
  connection.query(query, [addr, de_addr, deli_status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ addr, de_addr, deli_status });
  });
});

//제품 등록(제품명, 가격, 상품상태)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { product, price, product_status } = req.body;
  const query = 'UPDATE users SET product = ?, price = ?, product_status = ?';
  connection.query(query, [product, price, product_status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ product, price, product_status });
  });
});
  
// Delete
// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM users WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).send({ message: 'User not found' });
//     }
//     res.status(204).send();
//   });
// });

// 서버 시작
app.listen(port, () => {
    console.log(`Health Check API listening at http://localhost:${port}`);
});
