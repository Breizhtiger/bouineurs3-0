var App = angular.module('bouineur', ['ngRoute']);



// configure our routes
App.config(function($routeProvider) {
$routeProvider
                // route for the home page
                .when('/', {
                    templateUrl : '/static/pages/board.html',
                    controller  : 'boardController'
                })
                // route for the home page
                .when('/#', {
                    templateUrl : '/static/pages/board.html',
                    controller  : 'boardController'
                })

                // route for the home page
                .when('/board', {
                    templateUrl : '/static/pages/board.html',
                    controller  : 'boardController'
                })

                // route for the about page
                .when('/admin', {
                    templateUrl : '/static/pages/admin.html',
                    controller  : 'adminController'
                })


});

App.directive('shortcut', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    link:    function postLink(scope, iElement, iAttrs){
      jQuery(document).on('keypress', function(e){
         scope.$apply(scope.keyPressed(e));
       });
    }
  };
});
// create the controller and inject Angular's $scope
App.controller('mainController', ['$scope','$http',function($scope,$http) {
    // create a message to display in our view
    $scope.message = 'Bouineurs 3.0';
    $scope.goproState = 'false';
    $scope.picturesStatus = {};
    $http.get("/goProIsUp").then(function(response){
       $scope.goproState = response.data;
    },
    function(response){
          $scope.goproState = 'false';
        console.log("KO -> ", response);
    });

    $http.get("/picturesStatus").then(function(response){
         $scope.picturesStatus = response.data;
    },
    function(response){
        console.log("KO -> ", response);
    });
}]);

// create the controller and inject Angular's $scope
App.controller('boardController',['$scope','$http','$location','$route', function($scope,$http,$location,$route) {
    // create a message to display in our view
    $scope.message = 'Bouineurs 3.0';

    $scope.keyCode = "";
    $scope.keyPressed = function(e) {
      $scope.keyCode = e.which;
      ManageKeyAction($scope.keyCode);

    };

    function ManageKeyAction(key){
      console.log('-> '+key,String.fromCharCode(key));
        switch(key){
          case 49:
          //Go To dashboard
          $location.path("/board");
          break;
          case 50:
          //Go To Admin
          $location.path("/admin");
          break;
          case 51:
            //Take Picture
            $scope.TakePictureAction();
            break;
          case 52 :
            //heart on you
            $scope.HeartOnYouAction();
            break;
          case 53 :
            $scope.LikeLastPictureAction();
            break;
        }
    };



    function LoadPictures(){
      $http.get("/lastPicture").then(function(response){
          $scope.picturePath = response.data.path;
          $scope.pictureType = response.data.type;
      },
      function(response){
          console.log("KO -> ", response);
      });
    };



    $scope.LikeLastPictureAction = function(){
      $http.get("/likeLastPicture").then(
        function(response){
          LoadPictures();
        },
        function(response){
            console.log("KO -> ", response);
        });
    };

    $scope.TakePictureAction = function(){
      $http.get("/takePicture").then(function(response){
        LoadPictures();
      },
      function(response){
          console.log("KO -> ", response);
      });
    };

    $scope.HeartOnYouAction = function(){
      $http.get("/heartOnYou").then(function(response){
        LoadPictures();
      },
      function(response){
          console.log("KO -> ", response);
      });
    };
    LoadPictures();
}]);

// create the controller and inject Angular's $scope
App.controller('adminController', ['$scope','$http','$location','$route', function($scope,$http,$location,$route) {
    var iKey = 97;
    // create a message to display in our view
    $scope.message = 'Bouineur 3.0';
    $scope.process = [];


    function LoadProcess(){
      $http.get("/currentProcess").then(function(response){
        $scope.process = response.data;
        angular.forEach($scope.process, function(value, key) {
          value.keyCodeStop = iKey;
          value.keyStringStop =  String.fromCharCode(value.keyCodeStop);
          iKey = iKey +1;

          value.keyCodeRestart = iKey;
          value.keyStringRestart =  String.fromCharCode(value.keyCodeRestart);
          iKey = iKey +1;
          console.log('-> ',value);
        });
        iKey = 97;
      },
      function(response){
          console.log("KO truc-> ", response);
      });
    }



    $scope.actionsOnProcess = function(processName,action){
        var data = {};
        data.processName = processName;
        data.action = action;

        $http.post('/actionsProcess', data).then(function(response){

        },
        function(response){
            console.log("KO actions-> ", response);
        });
      };


      function actionsWithKey(processName,action){
          var data = {};
          data.processName = processName;
          data.action = action;

          $http.post('/actionsProcess', data).then(function(response){

          },
          function(response){
              console.log("KO actions-> ", response);
          });
        };
    $scope.printUptime = function(time){
      var current = new Date();
       var time = new Date(time);
       var diff = current - time;
       var resDate = new Date(diff);
       var res = resDate.getUTCHours()+' H, '+resDate.getUTCMinutes() +' M, '+resDate.getUTCSeconds()+ ' S';

      return res;
    };

    $scope.keyCode = "";
    $scope.keyPressed = function(e) {
      $scope.keyCode = e.which;
      ManageKeyAction($scope.keyCode);

    };

    function ManageKeyAction(key){
        switch(key){
          case 49:
          //Go To dashboard
          $location.path("/board");
          break;
          case 50:
          //Go To Admin
          $location.path("/admin");
          break;
          default:
            SpecialKey(key);
      }
    };

    function SpecialKey(sKeyCode){
      angular.forEach($scope.process, function(value, key) {
        if(value.keyCodeRestart != null && value.keyCodeRestart == sKeyCode){
          //ok c'est un restart
          console.log(' Event on '+value.name+ '  : RESTART');
          $scope.actionsOnProcess(value.name,'RESTART');
        }else{
          if(value.keyCodeStop != null && value.keyCodeStop == sKeyCode){
            //ok c'est un stop
            console.log(' Event on '+value.name+ '  : STOP');
            $scope.actionsOnProcess(value.name,'STOP');
          }else{

          }
        }

      });
      setTimeout(function(){ LoadProcess(); }, 1000);
    };

LoadProcess();

}]);
