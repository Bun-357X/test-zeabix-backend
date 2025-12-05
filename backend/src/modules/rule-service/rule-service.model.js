const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const RuleService = sequelize.define("rule_service", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  effective_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  effective_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  config_data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  delete_flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
});

module.exports = RuleService;
