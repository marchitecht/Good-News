const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BWlist }) {
      // define association here
      this.hasMany(BWlist, { foreignKey: 'tagId' });
    }
  }
  Tag.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
