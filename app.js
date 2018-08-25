const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

//路由中间件
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const captchaRouter = require('./routes/captcha');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//中间件express-session使用
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60*60*1000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//访问根目录下的资源
app.use('/users', usersRouter);//访问users目录下的资源
app.use('/captcha',captchaRouter);//访问captcha目录下的资源

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
