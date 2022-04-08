const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ News }) {
      // define association here
      this.hasMany(News, { foreignKey: 'sourceId' });
    }
  }
  Source.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};
