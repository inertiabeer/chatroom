var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment=require('moment');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server=require('http').createServer(app);
var datas=[];
var io=require('socket.io')(server);
io.on('connection',function(socket){
  console.log('连接上');
  console.log(datas);
  setTimeout(function(){
      datas.forEach(function(item,index){
    socket.emit('serverMessage',JSON.stringify(item));

  })

  },100);

  socket.on('client',function(content){
    console.log(content);
    var message={
      time:moment().format('YYYY-MM-DD HH:mm:ss'),
      name:socket.id,
      message:content
    };

    datas.push(message);

    socket.emit('serverMessage',JSON.stringify(message));
    socket.broadcast.emit('serverMessage',JSON.stringify(message));
    console.log(JSON.stringify(message));
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'dist')));

app.use('/',function(req,res)
{
	res.sendFile(path.resolve(__dirname+'/dist/index.html'));
})
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

server.listen(3000,function(err){
  if(err)
  {
    console.log(err)
  }
  console.log('服务器已经启动');
})
