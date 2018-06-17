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

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

// home page
app.get('/', (req, res, next) => {
  res.redirect('/wiki/');
});

// initialize the app by syncing databases then listen on PORT
const init = async () => {
  await models.db.sync();
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
};

init();
