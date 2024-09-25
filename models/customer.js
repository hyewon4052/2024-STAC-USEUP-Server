const { DataTypes } = require('sequelize');

const Customer = (sequelize) => {
  const customer = sequelize.define('Customer', {
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
    member_pw: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'customer',
    timestamps: false, // 기본으로 열이 생성되는 것을 방지
    indexes: [
      {
        unique: true,
        fields: ['member_id']
      }
    ],
    hooks: {
      beforeCreate: async (customer) => {
        const salt = await bcrypt.genSalt(10);
        customer.member_pw = await bcrypt.hash(customer.member_pw, salt);
      }
    }
});

// 비밀번호 비교 메서드 추가
customer.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.member_pw);
};

return customer;
};

module.exports = Customer;
