const jwt = require("jsonwebtoken");
const config = require('../config');
const { RateLimit } = require("./rateLimit");




const verifyToken = async function (req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(401).send({
      message: "Auth Header is missing.!",
    });
  }
  let token =
    req.headers["authorization"].split(" ")[1] || req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
  });
};




const authJwt = {
  verifyToken
};
module.exports = authJwt;
