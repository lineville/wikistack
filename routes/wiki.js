const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models/index');

router.get('/', (req, res, next) => {
  res.redirect('../');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  console.log(req.parser.HTTPParser[2]);
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
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
