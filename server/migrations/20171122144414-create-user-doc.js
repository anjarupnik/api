'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserDocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userEmail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cloudinaryFileName: {
        type: Sequelize.STRING
      },
      cloudinaryURL: {
        type: Sequelize.STRING
      },
      paidContract: {
        type: Sequelize.BOOLEAN
      },
      checkedContract: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserDocs');
  }
};
