const pool = require("../../config/database");

module.exports = {
    registerAnswer: (data, callback) => {
    pool.query(
      `INSERT INTO answer (answer, answer_code_block, user_id, question_id	) VALUES (?, ?, ?, ?)`,
      [data.answer, data.answer_code_block, data.user_id, data.question_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
    },
    getAnswerByQuestionId: (question_id, callback) => {
        pool.query(
          `SELECT * FROM answer WHERE question_id = ?`,
          [question_id],
          (err, result) => {
            if (err) {
              return callback(err);
            }
            return callback(null, result);
          }
        );
      },
    };