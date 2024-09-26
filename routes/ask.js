const express = require('express');
const { Inquiry } = require('../models'); // Inquiry 모델 가져오기
const router = express.Router();

// GET /ask - 특정 필드를 조회
router.get('/ask', async (req, res) => {
  try {
    // Sequelize를 사용해 member_id, date, title, category 필드만 선택해서 조회
    const inquiries = await Inquiry.findAll({
      attributes: ['member_id', 'date', 'title', 'category'] // 조회할 필드만 선택
    });

    // 조회된 데이터를 JSON 형식으로 응답
    res.status(200).json(inquiries);
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ error: 'An error occurred while fetching inquiries', details: err.message });
  }
});

module.exports = router;
