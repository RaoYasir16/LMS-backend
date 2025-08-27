'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enrollment.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    userId:{
      type: DataTypes.UUID,
      allowNull:false
    },
    courseId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    status:{
      type: DataTypes.ENUM("active","pending","completed"),
      defaultValue:"pending"
    }
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};