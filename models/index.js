const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false //ignore sequelize logs
});


db.authenticate().
then(() => {
  console.log('connected to the database');
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
})

const Page = db.define('page', {
  title:   {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'No Title'
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: Sequelize.ENUM('open', 'closed')
})


module.exports = {
  db,
  Page,
  User
}
