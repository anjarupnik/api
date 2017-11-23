'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pageItems', [{
           name: 'points',
           title: 'Wie ben ik?',
           content: 'Ik ben een Artificial Intelligence bot, die tekst kan lezen. Hoe meer contracten ik lees hoe sneller ik analyseer. Ik heb al honderden contracten gelezen. Inmiddels zie ik heel snel het verschil tussen een goed contract en eenzijdig contract. Als je wilt dat er na de analyse een advocaat naar kijkt kunnen we je koppelen aan een advocaat. (via Legalmatters.com) Ik kan .docx documenten en pdf lezen. Liever Docx',
           createdAt: Sequelize.fn('NOW'),
           updatedAt: Sequelize.fn('NOW')
         },{
           name: 'header',
           title: 'Contract Analyse',
           subtitle: 'Ik ben Joe, ik laat je binnen 24 uur weten wat een ZZP contract voor jou betekent.(Ik zorg dat je altijd aan de slag kunt na een opdracht)',
           content: 'Ik zoek afwijkende clausules in jouw contract, zoals concurrentiebedingen, onredelijke aansprakelijkheid & vrijwaringen.',
           createdAt: Sequelize.fn('NOW'),
           updatedAt: Sequelize.fn('NOW')
         },{
           name: 'footer',
           content: 'LegalJoe is een initiatief van Edouard Dopper die een voorliefde heeft voor Legal tech in samenwerking met AI applied. Joe is een AI bot.',
           urls: ['https://facebook.com/', 'https://twitter.com/realdonaldtrump', 'https://www.linkedin.com/in/edouard-dopper-0426856/'],
           createdAt: Sequelize.fn('NOW'),
           updatedAt: Sequelize.fn('NOW')
         },{
           name: 'examples',
           title: 'Wat ik doe',
           urls: ['http://res.cloudinary.com/mdfchucknorris/image/upload/v1511429630/exampleContract1_qdetg7.png', 'http://res.cloudinary.com/mdfchucknorris/image/upload/v1511429634/exampleContract2_yf2vcb.png'],
           createdAt: Sequelize.fn('NOW'),
           updatedAt: Sequelize.fn('NOW')
         }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('pageItems', null, {})
  }
};
