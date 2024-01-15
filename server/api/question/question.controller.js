const { registerQuestion, questionById, getQuestionByUser, getAllQuestions } = require('./question.service')
const pool = require('../../config/database')
const jwt = require('jsonwebtoken');

module.exports = {
    createQuestion: (req, res) => {
        const {
            question,
            question_description,
            question_code_block,
            tags,
            user_id
        } = req.body;

        if (!question || !question_description || !user_id) {
            return res.status(400).json({ msg: 'Not all fields have been provided' });
        }

        registerQuestion(req.body, (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ msg: 'Database connection error', error: err.message });
            }
            return res.status(201).json({ msg: 'Question has been created successfully', data: result });
        });
    },
    getQuestions: (req, res) => {
        getAllQuestions((err, result) => {
            if (err) {
                return  res.status(500).json({msg:'Database connection error'})
            }
            return res.status(200).json({msg:'List off Questions',data:result})
        })
        
    },
    getMyQuestion: (req, res) => {
        const { user_id } = req.query.params
        getQuestionByUser(user_id, (err, result) => {
            if (err) {
                return  res.status(500).json({msg:'Database connection error'})
            }
                return res.status(200).json({msg:`ist off Questions of user with id ${user_id}`,data:result})

        })
        
    },
    getById: (req, res) => {
        const { question_id } = req.body;
        questionById(question_id, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "database connection err" });
        }
        return res.status(200).json({ data: result });
        });
    },
}