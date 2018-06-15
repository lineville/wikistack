const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const app = express()
const path = require('path')
const layoutPage = require('./views/layout.js')
const models = require('./models');
const userRouter = require('./routes/user')
const wikiRouter = require('./routes/wiki')

const PORT = 3000

app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

// home page
app.get('/', (req, res, next) => {
  res.send(layoutPage('WikiStack'))
});

// initialize the app by syncing databases then listen on PORT
const init = async () => {
  await models.db.sync({force: true})
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
  })
}

init()
