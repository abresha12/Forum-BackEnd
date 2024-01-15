const router = require('express').Router();
const auth = require('../middleware/auth');
const { setAnswer, getAnswerByQId} = require('./answer.controller');

router.post('/', setAnswer);
router.post('/question_id', getAnswerByQId);

module.exports = router;