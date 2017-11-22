'use strict';
module.exports = (sequelize, DataTypes) => {
  var pageItem = sequelize.define('pageItem', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    content: DataTypes.TEXT,
    urls: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pageItem;
};
