var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000))

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
console.log(__dirname)
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('snake.html');
});


app.listen(app.get('port'));
