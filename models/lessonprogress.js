'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonProgress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LessonProgress.belongsTo(models.User, { foreignKey: 'userId' });
      LessonProgress.belongsTo(models.Lesson, { foreignKey: 'lessonId' });
    }
  }
  LessonProgress.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    lessonId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    completed:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    completedAt:{
      type:DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'LessonProgress',
  });
  return LessonProgress;
};