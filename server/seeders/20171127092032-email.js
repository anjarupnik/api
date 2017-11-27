'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Emails', [{
         subjectOne: 'Contract ontvangen',
         subjectTwo: 'Overviewed contract',
         textPaid: 'Je hebt gekozen voor de betaalde service, je contract wordt niet toegevoegd aan de Database',
         textFree: 'Je hebt gekozen voor de gratis Contract Analyse, je contract is toegevoegd aan mijn database',
         textChecked: 'Uw contract is gecheckt.',
         createdAt: Sequelize.fn('NOW'),
         updatedAt: Sequelize.fn('NOW')
       }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Emails', null, {})
  }
};
