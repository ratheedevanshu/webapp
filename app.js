
var express = require("./config/express");
const port = process.env.APP_PORT || 3000;

var app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
