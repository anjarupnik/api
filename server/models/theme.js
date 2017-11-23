'use strict';
module.exports = (sequelize, DataTypes) => {
  var Theme = sequelize.define('Theme', {
    primaryOne: DataTypes.STRING,
    primaryTwo: DataTypes.STRING,
    error: DataTypes.STRING,
    title: DataTypes.STRING,
    titleTwo: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    subtitleTwo: DataTypes.STRING,
    textColor: DataTypes.STRING,
    textTwo: DataTypes.STRING,
    canvas: DataTypes.STRING,
    border: DataTypes.STRING,
    disabled: DataTypes.STRING,
    fontTitle: DataTypes.STRING,
    fontSubtitle: DataTypes.STRING,
    fontText: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Theme;
};