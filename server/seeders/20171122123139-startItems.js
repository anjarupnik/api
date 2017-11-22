'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pageItems', [{
           name: 'points',
           title: 'Wie ben ik?',
           content: 'Ik ben een Artificial Intelligence bot, die tekst kan lezen. Hoe meer contracten ik lees hoe sneller ik analyseer. Ik heb al honderden contracten gelezen. Inmiddels zie ik heel snel het verschil tussen een goed contract en eenzijdig contract. Als je wilt dat er na de analyse een advocaat naar kijkt kunnen we je koppelen aan een advocaat. (via Legalmatters.com) Ik kan .docx documenten en pdf lezen. Liever Docx',
           createdAt: Sequelize.fn('NOW'),
           updatedAt: Sequelize.fn('NOW')
         }], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('pageItems', null, {})
  }
};
