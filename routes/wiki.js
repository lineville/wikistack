
const express = require('express');
const router = express.Router();
const { main, addPage, editPage, wikiPage } = require('../views');
const { Page } = require('../models/index');
const { User } = require('../models/index');


// get the main page with all the pages
router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    let authors = [];
    // console.log(pages);
    pages.forEach( async (page) => {
      const author = await User.findById(page.authorId);
      authors.push(author.name);
    })
    res.send(main(pages, authors));
  } catch (error) {
    next(error);
  }
});

// create a new post submission
router.post('/', async (req, res, next) => {
  try {
    const [author, wascreated] = await User.findOrCreate({
      where: {
        name: req.body.authorName,
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
});


router.post('/:slug', async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect(`/wiki/${updatedPages[0].slug}`)
  } catch (error) {
    console.log('unable to make post at ' + req.params.slug);
    next(error);
  }

})

// delete the post at this slug
router.get('/:slug/delete', async (req, res, next) => {
  try {
    // destroy the page with the slug of the request
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });
    // redirect back to main wiki page
    res.redirect('/wiki');
  } catch (error) {
    console.log('unable to delete page at wiki/' + req.params.slug);
    next(error);
  }
});

// get the add page form
router.get('/add', (req, res, next) => {
  res.send(addPage());
});

// get a page with a specific slug
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    if (!page) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    // if the page does not exist send 404, otherwise send it to the editpage
    // of the author of this page
    if (page === null) {
      res.status(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) {
    console.log('unable to get edit page for page at wiki/', req.params.slug);
    next(error);
  }
})


module.exports = router;
