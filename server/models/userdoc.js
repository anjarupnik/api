'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserDoc = sequelize.define('UserDoc', {
    userEmail: DataTypes.STRING,
    userName: DataTypes.STRING,
    cloudinaryFileName: DataTypes.STRING,
    cloudinaryURL: DataTypes.STRING,
    paidContract: DataTypes.BOOLEAN,
    checkedContract: DataTypes.BOOLEAN,
    userId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserDoc;
};
