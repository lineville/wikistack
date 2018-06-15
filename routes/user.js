const router = require('express').Router();
const userList = require('../views/userList');
const { User } = require('../models/index');

// router.get('/user')
router.get('/', async (req, res, next) => {
  try {
    const users = await userList(User.findAll());
    res.send(users);
  } catch (error) {
    console.log('could not find users');
    console.log(error);
  }
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const userPage = await userPages(
//       User.findById(req.params.id),
//       'user pages go here'
//     );
//     res.send(userPage);
//   } catch (error) {
//     console.log('error retrieving user page');
//     console.log(error);
//   }
// });

router.post('/', (req, res, next) => {});

router.put('/:id', (req, res, next) => {});

router.delete('/:id', (req, res, next) => {});

module.exports = router;
