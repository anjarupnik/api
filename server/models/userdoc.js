'use strict';
module.exports = (sequelize, DataTypes) => {
  var userDoc = sequelize.define('userDoc', {
    gooDriDocId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userDoc;
};
