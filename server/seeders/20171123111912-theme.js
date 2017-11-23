'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Themes', [{
         primaryOne: '#060c36',
         primaryTwo: '#FFC107',
         error: '#FFC107',
         title: '#060c36',
         titleTwo: '#FFFFFF',
         subtitle: '#060c36',
         subtitleTwo: '#FFFFFF',
         textColor: '#3a3737',
         textTwo: '#00E676',
         canvas: '#FFFFFF',
         border: '#DEDEDE',
         disabled: 'rgba(222, 222, 222, 0.7)',
         fontTitle: 'monospace',
         fontSubtitle: 'monospace',
         fontText: 'monospace',
         createdAt: Sequelize.fn('NOW'),
         updatedAt: Sequelize.fn('NOW')
       }], {});
 },

 down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Themes', null, {})
 }
};
