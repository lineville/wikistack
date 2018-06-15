const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false, //ignore sequelize logs
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
  },
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'No Title',
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: Sequelize.ENUM('open', 'closed'),
});

Page.belongsTo(User, { as: 'author' });

Page.beforeValidate((page) => {
  page.slug = createSlug(page.title)
})

// [Title] => string with only url friendly characters
const createSlug = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

module.exports = {
  db,
  Page,
  User,
};
