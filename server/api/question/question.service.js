const pool =require('../../config/database')


module.exports = {
    registerQuestion: (data, callback) => {
        pool.query(
          `INSERT INTO question(question,question_description,question_code_block,tags,user_id)VALUES(?,?,?,?,?)`,
          [
            data.question,
            data.question_description,
            data.question_code_block,
            data.tags,
            data.user_id,
          ],
          (err, result) => {
            if (err) {
              return callback(err);
            }
            return callback(null, result);
          }
        );
      },
    questionById: (question_id,callback) => {
        pool.query(
            `SELECT * FROM question WHERE question_id = ?`,
            [question_id],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    },
    getQuestionByUser: (user_id,callback) => {
        pool.query(`SELECT * FROM question WHERE question.user_id = ?`,[user_id],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    },
    getAllQuestions : (callback) => {
        pool.query(`SELECT * FROM question`,[],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    }
}