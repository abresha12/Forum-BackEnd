const { register, profile, userById, getUserByEmail, getAllUsers } = require('./user.service')
const pool = require('../../config/database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const { userName, firstName, lastName, email, password } = req.body;
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(password);
        // console.log(req.body)
        if (!userName || !firstName || !lastName || !email || !password)
            return res.status(400).json({ msg: 'Not all fildes have been provideded!' })
        if (!validPassword)
            return res.status(400).json({ msg: 'password must be Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character' });
        
         pool.query(`SELECT * FROM registration WHERE registration.user_email = ?`,[email],
            (err, result) => {
                if (err) 
                    return res.status(500).json({ msg: 'Database conection errorrr' });
                if (result.length > 0) res.status(400).json({ msg: 'An account with this email already exists!' });
                else {
                   const salt = bcrypt.genSaltSync();
                    req.body.password = bcrypt.hashSync(password, salt);

                    register(req.body, (err, result) => {
                        if (err) 
                        {
                            return res.status(500).json({ msg: 'Database conection error' })
                        }
                        pool.query(`SELECT * FROM registration WHERE registration.user_email = ?`,[email],
                            (err, result) => {
                                if (err) throw err;
                                    // return res.status(500).json({ msg: 'Database conection error' });
                                req.body.userId = result[0].user_id
                                req.body.user_name=result[0].user_name
                                const token = jwt.sign({ id: req.body.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

                                console.log(req.body)
                                profile(req.body, (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        return res.status(500).json({ msg: 'Database conection error' })
                                    }
                                    
                                    return res.status(201).json({
                                        msg: 'new user added sucessfully',
                                        token,
                                        user: {
                                            id: req.body.userId,
                                            display_name: req.body.user_name
                                        }
                                    })
                                })
                        })
                        
                    })
                }
            })
    },
    getUsers: (req, res) => {
        getAllUsers((err, result) => {
            if (err) 
            {
                return res.status(500).json({ msg: 'Database conection error' })
            }
            else {
                return res.status(200).json({
                    msg: `you have ${result.length} users`,
            data:result    })
                
            }
        })
            
    },
    getUserByIdNumber: (req, res) => {
        const { id } = req.params;
        // req.query.id
    
        //getting req.id from auth middleware
        userById(id, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "database connection err" });
          }
          if (!results) {
            return res.status(404).json({ msg: "Record not found" });
          }
          return res.status(200).json({ data: results });
        });
      },
      login: (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ msg: 'Not all fields have been provided!' });
        }
    
        getUserByEmail(email, (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'Database connection error' });
            }
    
            if (!result || result.length === 0) {
                return res.status(400).json({ msg: 'No user is registered using this email' });
            }
    
            const isPassMatch = bcrypt.compareSync(password, result[0].user_password);
            if (!isPassMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
    
            const token = jwt.sign({ id: result[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            return res.status(200).json({
                token,
                user: {
                    id: result[0].user_id,
                    display_name: result[0].user_name
                }
            });
        });
    },
    
    getUserById: (req, res) => {
        userById(req.id, (err, result) => {
            if (err) 
            {
                return res.status(500).json({msg:'database connection errortr'})
            }
            if (!result) {
                return res.status(400).json({msg:'record not found'})     
            }
            return res.status(400).json({data:result})

        })
    }
}