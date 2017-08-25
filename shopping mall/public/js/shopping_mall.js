//创建主模块
var app=angular.module('shopMallModule',['utilityModule']);
//创建路由
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
  //设置在android中显示时的tabs在底部。
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider.state('start',{
    url:'/start',
    templateUrl:'tpl/start.html'
    //controller:'startCtrl'
  }).state('register',{
    url:'/register',
    templateUrl:'tpl/register.html'
    //controller:'registerCtrl'  //放到register页面去  $scope作用域才一样
  }).state('login',{
    url:'/login',
    templateUrl:'tpl/login.html'
  }).state('welcome',{
    url:'/welcome',
    templateUrl:'tpl/welcome.html'
  }).state('main1',{
    url:'/main1',
    templateUrl:'tpl/f_main.html',
    controller:'sideMenuCtrl'
  }).state('main2',{
    url:'/main2',
    templateUrl:'tpl/main.html',
    controller:'mainCtrl'
  }).state('detail',{
    url:'/detail/:did',
    templateUrl:'tpl/detail.html',
    controller:'detailCtrl'
  }).state('cart',{
    url:'/cart',
    templateUrl:'tpl/cart.html',
    controller:'cartCtrl'
  }).state('pay',{
    url:'/pay',
    templateUrl:'tpl/pay.html',
    controller:'payCtrl'
  }).state('goods',{
    url:'/goods',
    templateUrl:'tpl/goods.html'
  }).state('outPage',{
    url:'/outPage',
    templateUrl:'tpl/outPage.html',
    parent:'goods'
  }).state('outPage1',{
    url:'/outPage1',
    templateUrl:'tpl/outPage1.html',
    parent:'goods'
  }).state('outPage2',{
    url:'/outPage2',
    templateUrl:'tpl/outPage2.html',
    parent:'goods'
  })
  $urlRouterProvider.otherwise('/start')
})
//创建父控制器，控制跳转
app.controller('parentCtrl',['$scope','$state',function($scope,$state){
  $scope.jump=function(desState,arg){
    $state.go(desState,arg);
  }
}])
//创建起始页面控制器，用于注册登录
app.controller('registerCtrl',['$scope','$httpParamSerializerJQLike','$http','$state',function($scope,$httpParamSerializerJQLike,$http,$state){
  //检测用户名是否存在
  $scope.submitBlur=function(){
    var uName=$scope.order.uName;
    //console.log(uName);
    //注意ajax的写法
    $http.get('registerCheck.do?uName='+uName).success(function(data){
      if(data.code<0){
        alert(data.msg);
      }
        //console.log(data.msg);
      }).error(function(){alert('请检查网络')})
  }
  $scope.submitOrder = function () {
    //可以通过服务 将对象 直接进行表单序列化
   //var b=document.getElementById("uname");
   //console.log(b);
   // console.log(b.value);
   //console.log($parent.uTel);
    //$scope.order='';
    //******************表单传值是undefined , 查找资料发现是$scope 作用域的问题, 解决 把controller写到页面去
    var reg=/^[a-z0-9\u4e00-\u9fa5]{6,12}$/i;   //定义正则匹配检查  6-12数字或字母或汉字
    var tel=/^1[34578]\d{9}$/;  //手机号  匹配正确的合法的手机号码
    var uName=$scope.order.uName;  //获得用户的昵称
    var uPwd=$scope.order.uPwd;    //获得用户的密码
    var utPwd=$scope.order.utPwd;  //确认密码
    var uTel=$scope.order.uTel;    //手机号
    console.log(uName,uPwd,utPwd,uTel);
    //检查用户名是否符合标准
    if(!reg.test(uName)){
      alert('用户名格式有误,请您检查');
      return;
    }
    //检查密码是否符合标准
    if(!reg.test(uPwd)){
      alert('密码格式不正确,请重新输入');
      return;
    }
    //确认密码是否正确
    if(uPwd!=utPwd){
      alert('两次密码不一致,请重新输入');
      return;
    }
    if(!tel.test(uTel)){
      alert('请输入合法的手机号');
      return;
    }
    //先验证用户名是否存在

    //console.log(1);
   // console.log($scope.order.uName,$scope.order.uPwd,$scope.order.utPwd,$scope.order.uTel);
   // 生成url提交字符串
    var params =
      $httpParamSerializerJQLike(
        $scope.order);
    //console.log(params);
    $http.get('register.do?'+params).success(function(data){
      if(data.code==1){
        console.log(data.msg);
        //利用sessionStorage 存储 用户名和密码  去登录页面存储  //加引号作为属性
        //sessionStorage[uName]=uName;
        //sessionStorage[uTel]=uTel;
        $state.go('login');
      }
    }).error(function(){
      alert('应该不会错吧')
    })
  }
}])
//创建登录控制器，用于登录
app.controller('loginCtrl',['$scope','$httpParamSerializerJQLike','$http','$state','$ionicPopup',function($scope,$httpParamSerializerJQLike,$http,$state,$ionicPopup){
  //检测用户名是否存在
  $scope.submitBlur=function(){
    var uName=$scope.order.userName;
    //console.log(uName);
    //注意ajax的写法
    $http.get('loginCheck.do?uName='+uName).success(function(data){
      if(data.code<0){
        alert(data.msg);
        $state.go('register');
      }
      //console.log(data.msg);
    }).error(function(){alert('请检查网络')})
  }
  $scope.submitOrder = function () {
    //可以通过服务 将对象 直接进行表单序列化
    //var b=document.getElementById("uname");
    //console.log(b);
    // console.log(b.value);
    //console.log($parent.uTel);
    //$scope.order='';
    //******************表单传值是undefined , 查找资料发现是$scope 作用域的问题, 解决 把controller写到页面去
    //虽然是登录页面但是还是要继续验证是否格式正确*******************//
    var reg=/^[a-z0-9\u4e00-\u9fa5]{6,12}$/i;   //定义正则匹配检查  6-12数字或字母
    var tel=/^1[34578]\d{9}$/;  //手机号  匹配正确的合法的手机号码
    var uName=$scope.order.userName;  //获得用户的昵称
    var uPwd=$scope.order.userPwd;    //获得用户的密码
    //console.log(uName,uPwd);
    //检查用户名是否符合标准
    if(!reg.test(uName)){
      alert('用户名格式有误,请您检查');
      return;
    }
    //检查密码是否符合标准
    if(!reg.test(uPwd)){
      alert('密码格式不正确,请重新输入');
      return;
    }
    // 表单序列化 提交数据
    var params =
      $httpParamSerializerJQLike(
        $scope.order);
    console.log(params);
    //console.log(params);
    $http.get('login.do?'+params).success(function(data){
      if(data.code==1){
        //console.log(data.msg);
        //利用sessionStorage 存储 用户名和密码
        sessionStorage['uName']=uName;
        //sessionStorage['']=uTel;
        $state.go('welcome');
      }else{
        alert(data.msg);
      }
    }).error(function(){
      alert('不会错了,证明了')
    })
  }
}])
//欢迎页面控制器,持续5秒进入主页面 main1
app.controller('welcomeCtrl',['$scope','$state','$interval',function($scope,$state,$interval){
  $scope.count=3;
  $scope.name=sessionStorage.getItem('uName');
  var timer=$interval(function(){
    $scope.count--;
    if($scope.count==0){
      clearInterval(timer);
      $state.go('main1');
    }
  },1000);
}])
//给关于添加控制器
//给设置页面 添加一个控制器  位于header中
app.controller('aboutCtrl', ['$scope', '$ionicModal','$ionicActionSheet','$state',
  function ($scope, $ionicModal,$ionicActionSheet,$state) {
    //显示一个自定义的模态框
    //①创建一个窗口的对象
    $ionicModal
      .fromTemplateUrl(
        'tpl/about.html',
        {
          scope: $scope
        }
      )
      .then(function (modal) {
        $scope.myModal = modal;
      })
    //②使用对象中show/hide方法
    $scope.showCustomModal =
      function () {
        $scope.myModal.show();
      }
    $scope.hideCustomModal = function () {
      $scope.myModal.hide();
    }
    //设置底部弹起菜单  用于分享
    $scope.showActionSheet=function () {
      $ionicActionSheet.show({
        cancelText: '取消',
        cancel: function () {
          //console.log('在执行取消操作');
        },
        //自定义操作
        buttons: [
          {text: '分享到微博'},
          {text: '分享到微信'},
          {text: '分享到QQ'}
        ],
        //处理自定义操作对应的处理函数
        buttonClicked: function (index) {
          if(index==0){
            location.href='https://weibo.com/'
          }
          else if(index==1){
            location.href='https://wx.qq.com/'
          }
          else if(index==2){
            location.href='https://qzone.qq.com/'
          }
          return true;
        }
      })
    }
    //返回起始页，清空用户信息
    $scope.clearItem=function(){
      sessionStorage.setItem('uName','');
      $state.go('start')
    }
  }
]);
//main1页面控制器 sideCtrl
app.controller('sideMenuCtrl',['$scope',function($scope){
  //slider的图片数据
  $scope.bannerList=[
    {'IMGPATH':'sjl_1.jpg'},
    {'IMGPATH':'dw.jpg'},
    {'IMGPATH':'gaier_l.jpg'},
    {'IMGPATH':'dw_l.jpg'},
    {'IMGPATH':'adgg.jpg'}
  ]
}])
//main2页面控制器 mainCtrl
app.controller('mainCtrl',['$scope','$shopHttp','$timeout',function($scope,$shopHttp,$timeout){
  //初始化数组
  $scope.shopList = [];
  //用于判断
  $scope.hasMore = true;
  //main2页面中左侧固定ul的列表数据
  $scope.list=[
    "国际名品","时尚潮流","都市女郎","绅士风度","运动达人","人气餐厅"
  ]
  //$scope.classListName="list_active"
  //一上来就加载数据，提高用户体验
  $shopHttp.sendRequest(
    'main.do?num=1',
    function (data) {
     // console.log(data);
      $scope.shopList = data;
    }
  )
  $scope.load=function(index) {
    //console.log(index);
    //$scope.hasMore = true;
    //根据参数去数据库查找数据,返回uid  的所有数据
    $shopHttp.sendRequest(
      'main.do?num='+index,
      function (data) {
        //console.log(data);
        $scope.shopList = data;
      }
    )
  }
  $scope.loadMore = function () {
    //console.log('准备去加载更多数据');
    $timeout(function(){
      $scope.hasMore = false;
      //结束掉加载更多的动作 发出广播
      $scope.$broadcast(
        'scroll.infiniteScrollComplete');
    },300)

  }
  //上拉刷新数据
  $scope.refreshData = function () {
    //console.log('准备刷新数据');
    $scope.$broadcast(
      'scroll.refreshComplete');
  }
}]);
//detail页面控制器
app.controller('detailCtrl',['$scope','$stateParams','$shopHttp','$ionicPopup',function($scope,$stateParams,$shopHttp,$ionicPopup){
  console.log($stateParams.did);
  $scope.id = $stateParams.did;
  $shopHttp.sendRequest('detail.do?did='+$scope.id,function (data) {
     //console.log(data);
      $scope.detailList=data[0];
    //详细信息存进去
    $scope.pri=data[0].price;
    //console.log($scope.pri);
    $scope.img=data[0].img;
    $scope.info=data[0].info;
    }
  )
  $scope.uName=sessionStorage.getItem("uName");
  //console.log($scope.uName);
  $scope.addToCart=function(){
    //发起网络请求  //保存商品编号
    $shopHttp.sendRequest('cartList.do?did='+$scope.id+'&uName='+$scope.uName+'&pri='+$scope.pri+'&img='+$scope.img+'&info='+$scope.info,function (data) {
        console.log(data);
        if (data.code == 1) {
          //弹窗显示添加到购物车成功
          $ionicPopup.alert({
            title: '提示信息',
            template: '添加成功,请查看购物车！'
          })
        }
      }
    )
  }
}])
//cart 页面控制器
app.controller('cartCtrl',['$scope','$shopHttp','$state',function($scope,$shopHttp,$state){
  $scope.editMsg = "编辑";
  $scope.editEnable = false;
  $scope.isCartEmpty = false;
  $scope.count=1;
  $scope.uName=sessionStorage.getItem('uName');
  $scope.priAll=null;
  //编辑、完成点击的处理函数
  $scope.toggleEditStatus =
    function () {
      if ($scope.editMsg == "编辑") {
        $scope.editMsg = "完成";
        $scope.editEnable = true;
      }
      else {
        $scope.editMsg = "编辑";
        $scope.editEnable = false;
      }
    }
  $shopHttp.sendRequest(
    '/cartDetail.do?uName=' + $scope.uName,
    function (result) {
      console.log(result);
      for(var i=0;i<result.length;i++){
        $scope.priAll+=parseInt(result[i].pri);
      }
      console.log($scope.priAll)
      $scope.cartList = result;
      if (result.code == -1) {//没有数据显示空盒子
        $scope.isCartEmpty = true;
      } else {
        $scope.isCartEmpty = false;
      }
    }
  )
  //未写增加和减少数据库的语句  需要完善
  $scope.reduceCount=function(index){
    $scope.count--;
    if($scope.count<=1){
      $scope.count=1;
    }
  }
  $scope.increaseCount=function(index){
    $scope.count++;
  }
  //跳转支付页面
  $scope.payJump=function(){
    $state.go('pay');
  }
}])
//支付页面
app.controller('payCtrl',['$scope','$interval','$state',function($scope,$interval,$state){
    $scope.count=3;
    var timer=$interval(function(){
      $scope.count--;
      if($scope.count==0){
        clearInterval(timer);
        $state.go('outPage');
      }
    },1000)
}])


