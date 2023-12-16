
const logger = require("../logger/logger");
const dbCall = require("../config/database")
const { json } = require("body-parser");
const { sendResponse } = require("../utilities/response");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "yo"
const { v4: uuidv4 } = require('uuid');
const publishEvent = require('../eventPublisher');


const login = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
  }
  let enteredPassword = password
const sqlQuery = 'SELECT * FROM users WHERE email = ? ';
const values = [email];
let user = await dbCall.executeInsertQuery(sqlQuery,values)
if(user.length>1){
  res.status(500).json({ error: 'Internal Server Error contact admin ' });
}
let signinguser = user[0]
let flag = bcrypt.compareSync(enteredPassword, user[0].password);
if(flag){

  jwt.sign({ signinguser}, secretKey, { expiresIn: '24h' }, (err, token) => {
    if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    return sendResponse(res, 200, true, "this is your token with 24 hrs expiry , you can customize it too !!! ",  token, null);
  
  })
}else{
  console.log('Authentication unsuccessful');
  return res.status(500).json({ message: 'some error has occured' });

}

}



const getUserDetail = async function (req,res){
  if (!req.params.id) {
    err.statusCode = 400;
    err.message = `error: must provide id`;
    err.custom = true
    throw err;
  }
const sqlQuery = 'SELECT * FROM users WHERE id = ? ';
const values = [req.params.id];
let user = await dbCall.executeInsertQuery(sqlQuery,values)
return sendResponse(res, 200, true, "These are your details", user, null);
}


const editPassword = async function (req, res) {
  try {
    if (!req.params.id || !req.body.password) {
      const err = new Error();
      err.statusCode = 400;
      err.message = 'error: must provide id and password ';
      err.custom = true;
      throw err;
    }
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    const values = [req.params.id];
    let user = await dbCall.executeInsertQuery(sqlQuery, values);
    if (!user || user.length === 0) {
      return sendResponse(res, 404, false, 'User not found', null, 'User not found');
    }
    const newPassword = req.body.password;
  const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  const updateValues = [hashedPassword, req.params.id];
  await dbCall.executeInsertQuery(updateQuery, updateValues);
  return sendResponse(res, 200, true, 'Password updated successfully', null, null);
  } catch (error) {
    console.error('Error in editPassword:', error);

    if (error.custom) {
      return sendResponse(res, error.statusCode, false, error.message, null, error.message);
    }

    return sendResponse(res, 500, false, 'Internal Server Error', null, 'Internal Server Error');
  }
};


const register = async function(req,res){
  const { email, password } = req.body;
  if (!email || !password) {
    return sendResponse(res, 200, true, "Missing email or passwor ", {}, null);

  }
  let sqlquery = `SELECT * FROM users WHERE email = '${email}';`;
  try {
      let result = await dbCall.executeSelectQuery(sqlquery);

      if (result.length > 0) {
    return sendResponse(res, 400, true, "email akready registered ", {}, null);

      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = { id: uuidv4(),email :  email, password: hashedPassword };
      console.log(newUser)
      sqlquery = 'INSERT INTO users (id, email, password, isactive, token) VALUES (?, ?, ?, ?, ?)'
      const values =  [newUser.id, newUser.email, newUser.password, true, "sampletoken"]
      await dbCall.executeInsertQuery(sqlquery,values)
    
      publishEvent.publishEvent({ type: 'user_registration', newUser });
      return sendResponse(res, 200, true, "user registered successfully ", newUser, null);

  } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  
}}

module.exports = {
  getUserDetail,
  login,
  editPassword,
  register
}
