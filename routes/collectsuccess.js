const express = require('express');
const { Pickup } = require("../models");
const router = express.Router();

router.get('/pickup/:id', async (req, res) => {
  const { id } = req.params;
  const { status, address, detailed_address } = req.query;  // GET 요청에서 req.query 사용
  
  // 필드 유효성 검사
  if (!id || !status || !address || !detailed_address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Sequelize를 사용하여 데이터를 조회
    const pickup = await Pickup.findOne({
      where: {
        id,
        status,
        address,
        detailed_address
      }
    });

    if (!pickup) {
      return res.status(404).json({ message: 'Pickup record not found' });
    }

    // 조회된 데이터를 반환
    res.status(200).json(pickup);

  } catch (err) {
    console.error('Error fetching pickup:', err);
    res.status(500).json({ error: 'An error occurred while fetching the pickup', details: err.message });
  }
});

module.exports = router;
