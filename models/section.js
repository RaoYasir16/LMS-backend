"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Section.belongsTo(models.Course, { foreignKey: "courseId",as:"course" });
      Section.hasMany(models.Lesson, { foreignKey: "sectionId", onDelete: "CASCADE"});
      Section.hasMany(models.Lesson, { foreignKey: "sectionId", onDelete: "CASCADE"});
      Section.hasMany(models.Lesson, { foreignKey: "sectionId", as: "lessons", onDelete: "CASCADE"});
    }
  }
  Section.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Section",
    }
  );
  return Section;
};
