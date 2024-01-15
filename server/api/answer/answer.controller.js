const { registerAnswer, getAnswerByQuestionId, getAnswerByUser, getAllAnswers } = require('./answer.service')
const pool = require('../../config/database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    setAnswer: (req, res) => {
        const {
            answer,
            answer_code_block,
            question_id,
            answer_id,
            user_id,
        } = req.body
        if (!answer || !question_id || !user_id) {
            res.status(400).json({msg:'Not all fildes have been provided'})
        }
        registerAnswer(req.body, (err, result) => {
          if (err) {
              return  res.status(500).json({msg:'Database connection error'})
            }
              return  res.status(201).json({msg:'Answer have been Set sussesfully',data:result})
                
        })
        
    },
    getAnswerByQId: (req, res) => {
        const { question_id } = req.body;
        getAnswerByQuestionId(question_id, (err, result) => {
          if (err) {
            return res.status(500).json({ msg: "database connection err" });
          }
          return res.status(200).json({ data: result });
        });
      },

}