const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const layoutPage = require('./views/layout.js');
const main = require('./views/main');
const models = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');
const { Page } = require('./models/index');

const PORT = 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// home page
app.get('/', async (req, res, next) => {
  const pages = await Page.findAll()
  res.send(main(pages));
});

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

// initialize the app by syncing databases then listen on PORT
const init = async () => {
  await models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
};

init();
