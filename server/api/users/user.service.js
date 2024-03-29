const pool =require('../../config/database')


module.exports = {
    register: (data,callback) => {
        pool.query(`INSERT INTO registration(user_name,user_email,user_password)VALUES(?,?,?)`,
            [
                data.userName,
                data.email,
                data.password
            ],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    },
    profile: (data,callback) => {
        pool.query(`INSERT INTO profile(user_id,first_name,last_name,user_password)VALUES(?,?,?,?)`,
            [
                data.userId,
                data.firstName,
                data.lastName,
                data.password
            ],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    },
    userById:  (id, callback) => {
        pool.query(
          `SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
          [id],
          (err, result) => {
            if (err) {
              return callback(err);
            }
            return callback(null, result[0]);
          }
        );
      },
    getUserByEmail: (email,callback) => {
        pool.query(`SELECT * FROM registration WHERE registration.user_email = ?`,[email],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    },
    getAllUsers : (callback) => {
        pool.query(`SELECT user_id,user_email,user_name FROM registration`,[],
            (err, result) => {
                if (err) return callback(err);
                return callback(null, result);
            })
    }
}