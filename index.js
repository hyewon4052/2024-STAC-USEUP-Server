const express = require('express');
const mysql = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
app.use(express.json());

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
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

// Create
// 고객 정보 등록
app.post('/users/customer', (req, res) => {
  const { member_id, member_pw, nickname } = req.body || {};

  // 필수 값에 대한 유효성 검사
  if (!member_id || !member_pw || !nickname) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }

  const query = 'INSERT INTO customer (member_id, member_pw, nickname) VALUES (?, ?, ?)';
  connection.query(query, [member_id, member_pw, nickname], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({
      id: results.insertId,
      member_id,
      member_pw,
      nickname
    });
  });
});

// 수거 정보 등록
app.post('/users/pickup', (req, res) => {
  const { status, accepted_at, pickuped_at, address, detailed_address } = req.body || {};

  if (!status || !accepted_at || !pickuped_at || !address || !detailed_address) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }

  const query = 'INSERT INTO pickup (status, acceppted_at, pickuped_at, address, detailed_address) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [status, accepted_at, pickuped_at, address, detailed_address], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({
      id: results.insertId, 
      status, 
      accepted_at, 
      pickuped_at, 
      address, 
      detailed_address });
  });
});

// 구매 정보 등록
app.post('/users/purchase', (req, res) => {
  const { product, delivery_status, purchased_at, address, detailed_address } = req.body || {};

  if (!product || !delivery_status || !purchased_at || !address || !detailed_address) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }

  const query = 'INSERT INTO purchase (product, delivery_status, purchased_at, address, detailed_address) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [product, delivery_status, purchased_at, address, detailed_address], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ 
      id: results.insertId, 
      product, 
      delivery_status, 
      purchased_at, 
      address, 
      detailed_address
    });
  });
});

// 제품 정보 등록
app.post('/users/product', (req, res) => {
  const { product, price, product_status } = req.body || {};

  if (!product || !price || !product_status) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }
  
  const query = 'INSERT INTO product (product, price, product_status) VALUES (?, ?, ?)';
  connection.query(query, [product, price, product_status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({
      id: results.insertId,
      product,
      price,
      product_status
    });
  });
});

// Update
// 고객 정보 업데이트
app.put('/users/customer/:id', (req, res) => {
  const { id } = req.params;
  const { point } = req.body;

  // 유효성 검사: point가 제공되지 않거나 유효하지 않으면 에러 반환
  if (point === undefined || point === null) {
    return res.status(400).json({ error: 'Point value is required and cannot be null' });
  }
  
  const query = 'UPDATE customer SET point = ? WHERE id = ?';
  connection.query(query, [point, id], (err, results) => {
    if (err) {
      return res.status(500).send(err); // 서버 에러 처리
    }
    if (results.affectedRows === 0) {
      // 고객이 없는 경우 404 에러 반환
      return res.status(404).send({ message: 'Customer not found' });
    }

    // 업데이트 후 해당 고객의 member_id를 조회하는 쿼리
    const selectQuery = 'SELECT member_id FROM customer WHERE id = ?';
    connection.query(selectQuery, [id], (err, rows) => {
      if (err) {
        return res.status(500).send(err); // 서버 에러 처리
      }
      if (rows.length === 0) {
        // 고객이 없는 경우
        return res.status(404).send({ message: 'Customer not found' });
      }
      const { member_id } = rows[0];
      res.status(200).send({
        message: 'Customer updated successfully',
        member_id,
        point
      });
    });
  });
});

// 수거 정보 업데이트
app.put('/users/pickup/:id', (req, res) => {
  const { id } = req.params;
  const { status, address, detailed_address } = req.body;

  if (!status || !address || !detailed_address) {
    return res.status(400).json({ 
      error: 'Fields are required and cannot be null' 
    });
  }

  const query = 'UPDATE pickup SET status = ?, address = ?, detailed_address = ? WHERE id = ?';
  connection.query(query, [status, address, detailed_address, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Pickup record not found' });
    }
    res.status(200).send({
      status,
      address,
      detailed_address
    });
  });
});

// 구매 정보 업데이트
app.put('/users/purchase/:id', (req, res) => {
  const { id } = req.params;
  const { product, delivery_status, address, detailed_address } = req.body;

  if (!product || !delivery_status || !address || !detailed_address) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }

  const query = 'UPDATE purchase SET product = ?, delivery_status = ?, address = ?, detailed_address = ? WHERE id = ?';
  connection.query(query, [product, delivery_status, address, detailed_address, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Purchase record not found' });
    }
    res.status(200).send({
      product,
      delivery_status,
      address,
      detailed_address 
    });
  });
});

// 제품 등록 업데이트
app.put('/users/product/:id', (req, res) => {
  const { id } = req.params;
  const { product, price, product_status } = req.body;

  if (!product || price === undefined || price === null || !product_status) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }

  const query = 'UPDATE product SET product = ?, price = ?, product_status = ? WHERE id = ?';
  connection.query(query, [product, price, product_status, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ 
      product, 
      price, 
      product_status 
    });
  });
});

// Delete
// 고객 정보 삭제
app.delete('/users/customer/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

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


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});