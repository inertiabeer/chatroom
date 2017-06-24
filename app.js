var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment=require('moment');
var session=require('express-session');
var pg=require('pg');
var Pool=pg.Pool;
var config={
  host: '47.94.226.150',
  user: 'postgres',
  password: '986619667',
  database: 'chatroom',
};
var pool=new Pool(config);

var app = express();
var server=require('http').createServer(app);
var datas=[];
var io=require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('key'));
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true
}))//这里使用session
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js',express.static(path.join(__dirname,'dist/js')));
app.get('/',function(req,res)
{
  if(req.session.user)
  { 
    res.sendFile(path.resolve(__dirname+'/dist/index.html'));
  }
  else
  {
    res.sendFile(path.resolve(__dirname+'/views/login.html'));
  }

	
})
app.post('/getname',function(req,res)
{
      var user=req.session.user;
      
      var name=user.username;

      res.send(JSON.stringify(name));
})
app.get('/user',function(req,res){
  res.sendFile(path.resolve(__dirname+'/views/login.html'));
});
app.post('/login', function(req, res) {
  console.log(req.body);
  var sql="SELECT userpassword FROM public.user WHERE username='"+req.body.username+"'";
  console.log(sql);
  pool.query(sql,function(err,result){
    if(err)
    {
      console.log(err);
    }
    console.log(result.rows[0].userpassword);
    if(result.rows[0].userpassword==req.body.password)
    {
      var user={
        username:req.body.username,
        password:req.body.password
      }
      req.session.user=user;
      res.send('y');



    }


  })

})
app.post('/logout',function(req,res){
  req.session.destroy(function(err)
  {if(err)
    {console.log(err);}
    
  })

   
    res.send('y');
  })
app.post('/logup', function(req, res) {
  console.log(req.body);
  var sql = "INSERT INTO public.user (username,userpassword) VALUES ('"+req.body.username+"', '"+ req.body.password + "')";
  console.log(sql);
  var user_table="CREATE TABLE user_"+req.body.username+"(action VARCHAR, time VARCHAR)";
  console.log(user_table);
  pool.query(user_table,function(err,result){
      if(err)
      {
        console.log(err);
      }


    });


  pool.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.send('n');
    }
    else{

    console.log(result);
    res.send('y');
  }
  })
});



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


io.on('connection',function(socket){
  setTimeout(function(){
    datas.forEach(function(item,index){
    socket.emit('serverMessage',JSON.stringify(item));

  })

  },100);//这里一会用promise替代了

  socket.on('client',function(content){
    console.log(content);
    var message={
      time:moment().format('YYYY-MM-DD HH:mm:ss'),
      name:socket.name,
      message:content
    };

    datas.push(message);//这里是让用户一登录就能看见小心

    socket.emit('serverMessage',JSON.stringify(message)); //发送回去
    socket.broadcast.emit('serverMessage',JSON.stringify(message));  //发送给其他客户端
    console.log(JSON.stringify(message));
  })
    socket.on('sendname',function(username){
      socket.name=username;

    })



})
