'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserDoc = sequelize.define('UserDoc', {
    gooDriDocId: DataTypes.STRING,
    userEmail: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserDoc;
};
