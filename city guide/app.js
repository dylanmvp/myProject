//mongodb连接语句
const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/city';
//创建node服务器，监听8080
const http=require('http');
const express=require('express');
const qs=require('querystring');
var app=express();
var server=http.createServer(app);
server.listen(8080);
//加载中间件
app.use(express.static("public"));
//获取客户端请求一次需要显示的城市数量
app.get('/main.do',(req,res)=>{
  var n=parseInt(req.query.num);
  var selectData = function(db, callback) {
    //连接到表
    var collection = db.collection('city-list');
    //查询数据条件
    var whereStr = n;
    //实现分页查询
    collection.find().skip((whereStr-1)*5).limit(5).toArray(function(err, result) {
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
      console.log(result);
      res.json(result);//发送给客户端
      //db.close();
    });
  });
})

//获取客户端传过来的did 进行筛选城市 使得detail与main相对应
app.get('/detail.do',(req,res)=>{
  var did=parseInt(req.query.did);
  var selectData = function(db, callback) {
    //连接到表city-detail
    var collection = db.collection('city-detail');
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
      console.log(result);
      res.json(result);//反馈给客户端
      db.close();
    });
  });
})