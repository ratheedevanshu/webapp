var router = require("express").Router();



router.use("/user", require("./user.routes"));
router.use("/game-data", require("./gameData.routes"));




router.use(function (req, res) {
    console.log(req)
    return res.status(404).json({
      message: "Not found.",
    });
  });
  
  module.exports = router;