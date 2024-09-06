const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'db',
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
// 고객 정보 등록
app.post('/users/customer', (req, res) => {
  const { member_id, member_pw, nickname } = req.body;
  const query = 'INSERT INTO customer (member_id, member_pw, nickname) VALUES (?, ?, ?)';
  connection.query(query, [member_id, member_pw, nickname], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, member_id, member_pw, nickname });
  });
});

// 수거 정보 등록
app.post('/users/pickup', (req, res) => {
  const { status, accepted_at, pickuped_at, address, detailed_address } = req.body;
  const query = 'INSERT INTO pickup (status, acceppted_at, pickuped_at, address, detailed_address) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [status, accepted_at, pickuped_at, address, detailed_address], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, status, accepted_at, pickuped_at, address, detailed_address });
  });
});

// 구매 정보 등록
app.post('/users/purchase', (req, res) => {
  const { product, delivery_status, purchased_at, address, detailed_address } = req.body;
  const query = 'INSERT INTO purchase (product, delivery_status, purchased_at, address, detailed_address) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [product, delivery_status, purchased_at, address, detailed_address], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, product, delivery_status, purchased_at, address, detailed_address });
  });
});

// 제품 정보 등록
app.post('/users/product', (req, res) => {
  const { product, price, product_status } = req.body;
  const query = 'INSERT INTO product (product, price, product_status) VALUES (?, ?, ?)';
  connection.query(query, [product, price, product_status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, product, price, product_status });
  });
});

  
// Update
//고객 정보 업데이트
app.put('/users/customer/:id', (req, res) => {
  const { id } = req.params;
  const { point } = req.body;
  const query = 'UPDATE customer SET point = ? WHERE id = ?';
  connection.query(query, [point, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ point });
  });
});

//수거 정보 업데이트
app.put('/users/pickup/:id', (req, res) => {
  const { id } = req.params;
  const { status, address, detailed_address } = req.body;
  const query = 'UPDATE pickup SET status = ?, address = ?, detailed_address = ? WHERE id = ?';
  connection.query(query, [status, address, detailed_address, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Pickup record not found' });
    }
    res.status(200).send({ status, address, detailed_address });
  });
});

//구매 정보 업데이트
app.put('/users/purchase/:id', (req, res) => {
  const { id } = req.params;
  const { product, delivery_status, address, detailed_address } = req.body;
  const query = 'UPDATE purchase SET product = ?, delivery_status = ?, address = ?, detailed_address = ? WHERE id = ?';
  connection.query(query, [product, delivery_status, address, detailed_address, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Purchase record not found' });
    }
    res.status(200).send({ product, delivery_status, address, detailed_address });
  });
});

//제품 등록 업데이트
app.put('/users/product/:id', (req, res) => {
  const { id } = req.params;
  const { product, price, product_status } = req.body;
  const query = 'UPDATE product SET product = ?, price = ?, product_status = ? WHERE id = ?';
  connection.query(query, [product, price, product_status, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ product, price, product_status });
  });
});


// 서버 시작
app.listen(port, () => {
    console.log(`Health Check API listening at http://localhost:${port}`);
});
