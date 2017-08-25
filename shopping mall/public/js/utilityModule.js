/**
 *  Created this service on 2017/8/13.
 **/
//在该文件中 创建一个模块utilitModule
//在这个模块中，封装一个服务
//自定义的模块，封装服务
var utilityModule =
    angular.module('utilityModule', ['ionic']);

utilityModule.service(
    '$shopHttp',
    ['$http', '$ionicLoading','$timeout',
      function ($http, $ionicLoading,$timeout) {

        this.sendRequest =
            function (url,handlerFunc) {
          //发起网络请求 控制加载中窗口的显示和关闭
          $ionicLoading.show({
            template:'<img src="img/load.gif" style="background: transparent">',
            //duration:5000
          })
          $http.get(url)
              .success(function (data) {
                //加载假象
                $timeout(function(){
                  $ionicLoading.hide();
                },300)
                handlerFunc(data);
              })
        }
      }])