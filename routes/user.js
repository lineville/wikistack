const router = require('express').Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages')
const { User } = require('../models/index');

// router.get('/user')
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    // console.log('id: ' + users[0].id + ' name: ' + users[0].name)
    res.send(userList(users));
  } catch (error) {
    console.log('could not find users');
    next(error);
  }
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const userPage = await User.findById(req.params.id).findAll({
//       where: {
//         id:
//       }
//     });
//     res.send(userPages(userPage));
//   } catch (error) {
//     console.log('error retrieving user page');
//     console.log(error);
//   }
// });

router.post('/', (req, res, next) => {});

router.put('/:id', (req, res, next) => {});

router.delete('/:id', (req, res, next) => {});

module.exports = router;
