'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Section, { foreignKey: "sectionId",as: "section" });
      Lesson.hasMany(models.LessonProgress, { foreignKey: 'lessonId' });
    }
  }
  Lesson.init({
    id:{
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    videoUrl:{
      type:DataTypes.STRING,
      allowNull:false
    },
    sectionId:{
      type:DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};