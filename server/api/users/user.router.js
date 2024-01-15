const router = require('express').Router();
const auth = require('../middleware/auth');
const { createUser, getUsers,login,getUserById,getUserByIdNumber } = require('./user.controller');

router.post('/', createUser);
router.post('/login', login);
router.get('/getall', getUsers);
router.get('/:id',getUserByIdNumber)
router.get('/',auth,getUserById)

module.exports = router;