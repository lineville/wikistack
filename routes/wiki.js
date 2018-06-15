const router = require('express').Router();
const bodyparser = require('body-parser');
const addPage = require('../views/addPage');
const { Page } = require('../models/index');

router.get('/', (req, res, next) => {
  res.redirect('../');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});


router.post('/', async (req, res, next) => {
  console.log('req body' + req)
  let page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});


module.exports = router;
