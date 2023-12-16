const express = require('express');
const router = express.Router();
var controller = require("../controllers/gameData.controller");
var authPolicy = require("../middlewares/authPolicy");


router.post('/add-game-data',[authPolicy.verifyToken], controller.addGameData);
router.put('/edit-game-data/:id',[authPolicy.verifyToken], controller.editGameData);
router.delete('/delete-game-data/:id',[authPolicy.verifyToken] ,controller.deleteGameData);
router.delete('/byUserID/:id',[authPolicy.verifyToken],controller.getGameDataByUserId);





module.exports = router;
