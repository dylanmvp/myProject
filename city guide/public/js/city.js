//设置模块
var app=angular.module('myApp',['ng','ngRoute']);
//路由配置
app.config(function($routeProvider){
  $routeProvider.when('/start',{
    templateUrl:'tpl/start.html',
    controller:'startCtrl'
  }).when('/main',{
    templateUrl:'tpl/main.html',
    controller:'mainCtrl'
  }).when('/detail/:did',{
    templateUrl:'tpl/detail.html',
    controller:'detailCtrl'
  }).when('/travel',{
    templateUrl:'tpl/travel.html'
  }).otherwise({
    redirectTo:'/start'
  })
})
//父控制器制定路径跳转方法
app.controller('bodyCtrl',['$scope','$location',
function($scope,$location){
  $scope.jump=function(desPath){
    $location.path(desPath)
  }
}])
//自定义指令用于显示map
app.directive('main',function(){
  return{
    template:'<div id="main"></div>',
    restrict:'ECMA',
    replace:true
  }
})
app.controller('startCtrl',['$scope','$http',function($scope,$http){
  //获取地图数据
  $http.get('data/china.json').success(function(chinaJson){
      echarts.registerMap('china', chinaJson);
      var chart = echarts.init(document.getElementById('main'));
      chart.setOption({
        series: [{
          type: 'map',
          map: 'china'
        }]
      })
  })
}])
app.controller('mainCtrl',['$scope','$http',function($scope,$http){
  $scope.hasMore = true;
  $scope.num=1;
  $http.get('/main.do?num='+$scope.num).success(function(data){
    console.log(data);
    $scope.city_list=data;
  })
  $scope.loadMore = function () {
    $scope.num++;
    $http.get('/main.do?num='+$scope.num)
      .success(function (data) {
        if (data.length < 5) {
          $scope.hasMore=false;
        }
        console.log(data);
        $scope.city_list=$scope.city_list.concat(data);
      })
  }
}])
app.controller('detailCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
  console.log($routeParams)
  $scope.did=$routeParams.did;
  $http.get('/detail.do?did='+$scope.did).success(function(data){
    console.log(data);
    $scope.city_scenery=data;
  })
}])


