'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Course, { foreignKey: "instructorId" });
      User.hasMany(models.LessonProgress, { foreignKey: 'userId' });
    }
  }
  User.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    role:{
      type:DataTypes.ENUM("student", "instructor"),
      defaultValue:"student"
    },
    isBlocked:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};