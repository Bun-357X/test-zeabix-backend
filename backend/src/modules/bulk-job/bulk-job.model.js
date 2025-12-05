const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const BulkJob = sequelize.define("bulk_job", {
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  result_data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  delete_flag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
});

module.exports = BulkJob;
