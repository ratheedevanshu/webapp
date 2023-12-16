const express = require('express');
var router = require("express").Router();
const userRouter = express.Router();
var authPolicy = require("../middlewares/authPolicy");
var loggerReq = require('../middlewares/loggerReq')
var controller = require("../controllers/users.controller");

router.post('/login', loggerReq, controller.login);
router.get('/:id', loggerReq,[authPolicy.verifyToken], controller.getUserDetail);
router.put('/editPassword/:id', [authPolicy.verifyToken], controller.editPassword);
router.post('/createUser', controller.register);


module.exports = router;