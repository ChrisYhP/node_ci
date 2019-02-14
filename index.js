const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session')
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Blog');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

mongoose.connection.on('connected', () => {
  console.log('mongo数据库连接成功!')
})

const app = express();
let router = express.Router();


app.use(
  session({
    secret: 'demo_test',
    name: 'mydemo',                         //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {  maxAge: 300 * 60 * 1000 },    //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
    resave: false,                         // 每次请求都重新设置session cookie
    saveUninitialized: true   
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// 设置跨域请求
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-with, X_Requested_With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
      res.end('options ok');
  } else {
      next();
  }
});

require('./routes/blogRoutes')(app);
require('./routes/authRoutes')(app);



if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
