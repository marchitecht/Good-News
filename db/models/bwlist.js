const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BWlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tag }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Tag, { foreignKey: 'tagId' });
    }
  }
  BWlist.init({
    tagId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isGood: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'BWlist',
  });
  return BWlist;
};
