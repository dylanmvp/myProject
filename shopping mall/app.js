//注入需要使用的模块
const http=require('http');
const qs=require('querystring');
const express=require('express');
//监听8080端口服务器
var app=express();
var server=http.createServer(app);
server.listen(8080);
//加载中间件用于访问public文件夹下的所有文件
app.use(express.static("public"));
//创建mongodb连接
const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/shopping';
//获取客户端请求一次需要显示的品牌数量  main2页面显示的数据
app.get('/main.do',(req,res)=>{
  var n=parseInt(req.query.num);
  var selectData = function(db, callback) {
    //连接到表
    var collection = db.collection('brand');
    //查询数据条件
   // var whereStr = n;
    //查找id相同的数据
    collection.find({"uid":n}).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result);
    });
  };
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    //console.log("连接成功！");
    selectData(db, function(result) {
      //console.log(result);
      res.json(result);//发送给客户端
      //db.close();
    });
  });
})
//获取main2页面传过来的did ,查询detail表 ，返回数据 并显示
app.get('/detail.do',(req,res)=>{
  //系数从字符串转换成number
  var did=parseInt(req.query.did);
  var selectData = function(db, callback) {
    //连接到表city-detail
    var collection = db.collection('detail');
    //查询数据条件
    var str = {"did":did};
    collection.find(str).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result);
    });
  };
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    //console.log("连接成功！");
    selectData(db, function(result) {
      //console.log(result);
      res.json(result);//反馈给客户端
      db.close();     //关闭连接
    });
  });
})
//在mongodb中查看是否存在该用户
app.get('/registerCheck.do',(req,res)=>{
  //获取用户信息
  var uName=req.query.uName;
  //var uPwd=(req.query.uPwd);
  //var uTel=(req.query.uTel);
  //console.log(uName,uPwd,uTel);
  var selectData = function(db, callback) {
    //连接到表register
    var collection = db.collection('register');
    //查询数据条件  根据用户名
    var str = {"uName":uName};
    collection.find(str).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result);
    });
  };
  //连接数据库
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    //console.log("连接成功！");
    if(err) throw err;
    selectData(db, function(result) {
      //console.log(result);
      //res.json(result);//反馈给客户端
      //结果判断
      //长度小于1说明用户名不存在 可以注册
      if(result.length<1){
        res.json({"code":1,"msg":"可以使用"})
      }else {
        //插入一条用户信息
        //console.log('可以使用')
        res.json({"code":-1,"msg":"已经存在,请换个昵称"})
      }
      db.close();
    });
  });
})
//注册信息  是否可以去登录  增加用户数据
app.get('/register.do',(req,res)=>{
  //系数从字符串转换成number
  var uName=(req.query.uName);
  var uPwd=(req.query.uPwd);
  var uTel=(req.query.uTel);
  //console.log(uName,uPwd,uTel);
  function insertData(db)
  {
    var collection = db.collection('register');
    var data = {"uName":uName,"uPwd":uPwd,"uTel":uTel};
    collection.insertOne(data,function(err, result){
      if(err)
      {
        console.log('Error:'+ err);
      }else{
        res.json({"code":1,"msg":"注册成功"})
      }
      db.close();
    });
  }
  MongoClient.connect(DB_CONN_STR, function(err, db){
    //console.log('连接成功!');
    insertData(db);
  });
})
//登录信息 查询register表 是否存在  存在即可登录  不存在不可以登录
app.get('/login.do',(req,res)=>{
  //获取用户信息
  var uName=req.query.userName;
  var uPwd=req.query.userPwd;
  //var uTel=(req.query.uTel);
  console.log(uName,uPwd);
  var selectData = function(db, callback) {
    //连接到表register
    var collection = db.collection('register');
    //查询数据条件  根据用户名
    var str = {"uName":uName,"uPwd":uPwd};
    collection.find(str).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result);
    });
  };
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err, db) {
    //console.log("连接成功！");
    if(err) throw err;
    selectData(db, function(result) {
      //console.log(result);
      //res.json(result);//反馈给客户端
      //结果判断
      //长度小于1说明用户名不存在 可以注册
      if(result.length<1){
        res.json({"code":-1,"msg":"您的密码有误"})
      }else {
        res.json({"code":1,"msg":"欢迎您"})
      }
      db.close();
    });
  });
})
//用于检查用户名是否存在
app.get('/loginCheck.do',(req,res)=>{
  //获取用户信息
  var uName=req.query.uName;
  //var uPwd=req.query.uPwd;
  //var uTel=(req.query.uTel);
  //console.log(uName,uPwd,uTel);
  var selectData = function(db, callback) {
    //连接到表register
    var collection = db.collection('register');
    //查询数据条件  根据用户名
    var str = {"uName":uName};
    collection.find(str).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result);
    });
  };
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err, db) {
    //console.log("连接成功！");
    if(err) throw err;
    selectData(db, function(result) {
      //console.log(result);
      //res.json(result);//反馈给客户端
      //结果判断
      //长度小于1说明用户名不存在 可以注册
      if(result.length<1){
        res.json({"code":-1,"msg":"该用户名不存在,请您注册"})
      }
      db.close();
    });
  });
})
//用户添加用户购买的物品编号
app.get('/cartList.do',(req,res)=>{
  //系数从字符串转换成number
  var uid=req.query.did;
  var uName=req.query.uName;
  var pri=req.query.pri;
  var img=req.query.img;
  var info=req.query.info;
  //console.log(uName,uPwd,uTel);
  function insertData(db)
  {
    var collection = db.collection('cartlist');
    var data = {"uid":uid,"uName":uName,"pri":pri,"img":img,"info":info};
    collection.insertOne(data,function(err, result){
      if(err)
      {
        console.log('Error:'+ err);
      }else{
        res.json({"code":1,"msg":"添加成功,请查看购物车"})
      }
      db.close();
    });
  }
  MongoClient.connect(DB_CONN_STR, function(err, db){
    //console.log('连接成功!');
    insertData(db);
  });
})
//购物车详情表
app.get('/cartDetail.do',(req,res)=>{
  var uName=req.query.uName;
  //查询用户购买记录
  var selectData = function(db, callback) {
    //连接到表register
    var collection = db.collection('cartlist');
    //查询数据条件  根据用户名
    var str = {"uName":uName};
    collection.find(str).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result);
    });
  };
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err, db) {
    //console.log("连接成功！");
    if(err) throw err;
    selectData(db, function(result) {
      //console.log(result);
      //res.json(result);//反馈给客户端
      //结果判断
      //长度小于1说明用户名不存在 可以注册
      if(result.length<1){
        res.json({"code":-1,"msg":"没有购买记录"})
      }else{
        res.json(result);
      }
      db.close();
    });
  });
})