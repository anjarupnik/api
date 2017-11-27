const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};
const User = require('./user')
const UserDoc = require('./userdoc')
const pageItem = require('./pageitem')
const Theme = require('./theme')
const Email = require('./email')

module.exports = {
  User,
  UserDoc,
  pageItem,
  Theme,
  Email
}

let sequelize, match, herokuConfig;
if (process.env.DATABASE_URL) {
  match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  herokuConfig = {
    user: match[1],
    pass: match[2],
    base: match[5],
    options: {
      dialect: 'postgres',
      protocol: 'postgres',
      host: match[3],
      logging: true,
      port: match[4],
      dialectOptions: {
          ssl: true
      }
    }
  };
}

if (herokuConfig) {
  sequelize = new Sequelize(herokuConfig.base, herokuConfig.user, herokuConfig.pass, herokuConfig.options);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
