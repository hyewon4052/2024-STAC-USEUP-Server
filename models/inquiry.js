const { DataTypes } = require('sequelize');

const Inquiry = (sequelize) => sequelize.define('Inquiry', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  member_id: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50), // 제목은 최대 50자로 제한
    allowNull: false
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // 생성 시 현재 날짜/시간 자동 입력
  },
  category: {
    type: DataTypes.STRING, // 쉼표로 구분된 여러 카테고리를 저장
    allowNull: false,
    validate: {
      isInCategories(value) {
        const validCategories = ['재질', '업체'];
        const categories = value.split(','); // 입력된 카테고리들을 쉼표로 분리
        for (let category of categories) {
          if (!validCategories.includes(category.trim())) {
            throw new Error('Invalid category. Only 재질, 업체 are allowed.');
          }
    }}}}
    }, {
        tableName: 'inquiry',
        timestamps: false // createdAt, updatedAt 자동 생성 방지
});

module.exports = Inquiry;
