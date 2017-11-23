'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Themes', [{
         primaryOne: '#00796B',
         primaryTwo: '#FFC107',
         error: '#FFC107',
         title: '#00796B',
         titleTwo: '#FFFFFF',
         subtitle: '#00796B',
         subtitleTwo: 'rgba(222, 222, 222, 0.5)',
         textColor: '#3a3737',
         textTwo: '#FFC107',
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
