const express = require('express');
const app = express();
const port = 3000;

// JSON 요청 처리를 위한 미들웨어
app.use(express.json());

// // 라우트 연결
// const userRoutes = require('./routes/crud');
// app.use('/users', userRoutes); // '/users' 경로에서 CRUD API 사용

// 간단한 엔드포인트
app.get('/ping', (req, res) => {
    res.send('pong');
});

// health-check 엔드포인트
app.get('/health-check', (req, res) => {
    res.send('ok');
});


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
  
  
  // Read
  // 고객 정보 조회
  app.get('/users/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM customer WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(results[0]);  // 고객 정보를 JSON 형태로 응답
    });
  });
  
    
  // Update
  // 고객 정보 업데이트
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
      res.status(200).send({ message: 'User updated successfully', point });
    });
  });
  
  // 수거 정보 업데이트
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
  
  // 구매 정보 업데이트
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
  
  // 제품 등록 업데이트
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
  
  
  // Delete
  // 고객 정보 삭제
  app.delete('/users/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM customer WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    });
  });


  // 서버 시작
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
