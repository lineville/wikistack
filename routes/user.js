const router = require('express').Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages')
const { User, Page } = require('../models/index');

// router.get('/user')
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    console.log('could not find users');
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    res.send(userPages(user, pages));
  } catch (error) {
    console.log('error retrieving user page', error);
    next(error);
  }
});

// router.post('/', (req, res, next) => {});

// router.put('/:id', (req, res, next) => {});

// router.delete('/:id', (req, res, next) => {});

module.exports = router;
