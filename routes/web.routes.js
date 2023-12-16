var router = require('express').Router();


router.get('/', function(req, res) {
  res.redirect('./app/index.html');
});

// these are for browser error handling
router.use(function(req, res) {
  res.status(404);
  return res.render('error', {
    title: 'Something went wrong',
    error: 404,
    message: 'un expected errors'
  });
});

module.exports = router;