'use strict';
module.exports = (sequelize, DataTypes) => {
  var Email = sequelize.define('Email', {
    subjectOne: DataTypes.STRING,
    subjectTwo: DataTypes.STRING,
    textPaid: DataTypes.STRING,
    textFree: DataTypes.STRING,
    textChecked: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Email;
};