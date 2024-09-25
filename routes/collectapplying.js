const express = require('express');
const { Pickup } = require("../models");
const router = express.Router();

router.post('/pickup', async (req, res) => {
  const { status, accepted_at, pickuped_at, address, detailed_address } = req.body || {};
  
  // 필수 필드 체크
  if (!status || !accepted_at || !pickuped_at || !address || !detailed_address) {
    return res.status(400).json({
      error: 'Fields are required and cannot be null'
    });
  }

  // 날짜 형식 유효성 검사
  if (isNaN(Date.parse(accepted_at)) || isNaN(Date.parse(pickuped_at))) {
    return res.status(400).json({ 
      error: 'Invalid date format' 
    });
  }

  const validStatuses = [0, 1, 2];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  
  try {
    // Sequelize를 통해 새로운 픽업 데이터 생성
    const newPickup = await Pickup.create({
      status,
      accepted_at,
      pickuped_at,
      address,
      detailed_address
    });

    // 성공적인 응답 반환
    res.status(201).json(newPickup);

  } catch (err) {
    console.error('Error creating new pickup:', err);
    res.status(500).json({ error: 'An error occurred while creating the pickup', details: err.message });
  }
});
  
module.exports = router;