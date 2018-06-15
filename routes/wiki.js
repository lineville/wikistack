const router = require('express').Router();
const bodyparser = require('body-parser');
const addPage = require('../views/addPage');
const { Page } = require('../models/index');
const { User } = require('../models/index');
const wikipage = require('../views/wikipage');


router.get('/', (req, res, next) => {
  res.redirect('../');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    res.send(wikipage(page));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  console.log('req params: ' + req.params + '\n')
  try {
    const [author, wascreated] = await User.findOrCreate({
      defaults: {
        name: 'Author name default',
        email: 'author@email.com'
      },
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const page = await Page.create(req.body);

    page.setAuthor(author);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);

  } catch (error) {
    console.log('unable to display posts', error);
    next(error);
  }
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
});


module.exports = router;
