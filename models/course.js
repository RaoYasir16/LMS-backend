'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.User, { foreignKey: "instructorId" });
      Course.hasMany(models.Section, { foreignKey: "courseId", as: "sections", onDelete: "CASCADE" });
    }
  }
  Course.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    title:{
      type: DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    price:{
      type:DataTypes.STRING,
      allowNull:false
    },
    category:{
      type:DataTypes.UUID,
      allowNull:false
    },
    thumbnail:{
      type: DataTypes.STRING,
      allowNull:false
    },
    instructorId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending"
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};