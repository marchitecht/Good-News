const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Source, Tag }) {
      // define association here
      this.belongsTo(Source, { foreignKey: 'sourceId' });
      this.belongsToMany(Tag, { through: 'NewsTag', foreignKey: 'newsId' });
    }
  }
  News.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    img: DataTypes.STRING,
    sourceId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
