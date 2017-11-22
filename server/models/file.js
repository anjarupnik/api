'use strict';
module.exports = (sequelize, DataTypes) => {
  var File = sequelize.define('File', {
    gdFileId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return File;
};
