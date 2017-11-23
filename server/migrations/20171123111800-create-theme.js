'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Themes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primaryOne: {
        allowNull: false,
        type: Sequelize.STRING
      },
      primaryTwo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      error: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      titleTwo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subtitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subtitleTwo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      textColor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      textTwo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      canvas: {
        allowNull: false,
        type: Sequelize.STRING
      },
      border: {
        allowNull: false,
        type: Sequelize.STRING
      },
      disabled: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fontTitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fontSubtitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fontText: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Themes');
  }
};
