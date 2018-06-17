const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false, //ignore sequelize logs
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: Sequelize.ENUM('open', 'closed'),
});

Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = createSlug(page.title)
  }
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

Page.belongsTo(User, { as: 'author' });


// [Title] => string with only url friendly characters
const createSlug = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

module.exports = {
  db,
  Page,
  User,
};
