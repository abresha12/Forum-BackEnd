const router = require('express').Router();
const auth = require('../middleware/auth');
const { createQuestion, getQuestions,getMyQuestion,getById} = require('./question.controller');

router.post('/', createQuestion);
router.get('/', getQuestions);
router.post('/id', getById);

module.exports = router;