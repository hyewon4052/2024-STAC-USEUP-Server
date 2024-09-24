const express = require('express');
const { Pickup } = require("../models");
const router = express.Router();

// 픽업 정보 업데이트
router.put('/pickup/:id', async (req, res) => {
  const { id } = req.params;
  const { status, address, detailed_address } = req.body;

  // 필수 필드 체크
  if (status === undefined || address === undefined || detailed_address === undefined) {
    return res.status(400).json({ 
      error: 'Fields are required and cannot be null' 
    });
  }
  if (address.trim() === '' || detailed_address.trim() === '') {
    return res.status(400).json({ 
      error: 'Address fields cannot be empty' 
    });
  }

  const validStatuses = [0, 1, 2];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: 'Invalid status value' 
    });
  }

  try {
    // 픽업 정보 업데이트
    const [updatedRows] = await Pickup.update(
      { status, address, detailed_address },
      { where: { id } }
    );

    // 업데이트된 행이 없을 경우
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Pickup record not found' });
    }

    // 성공적인 응답
    res.status(200).json({
      status,
      address,
      detailed_address
    });

  } catch (err) {
    console.error(`Error updating pickup record with id ${id}:`, err);
    res.status(500).json({ error: 'An error occurred while updating the pickup record', details: err.message });
  }
});

module.exports = router;
