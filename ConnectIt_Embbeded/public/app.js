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
App.controller('boardController',['$scope','$http','$location', function($scope,$http,$location) {
    // create a message to display in our view
    $scope.message = 'Bouineurs 3.0';

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

    $http.get("/lastPicture").then(function(response){
      console.log("OK ->",response);
        $scope.picturePath = response.data.path;
        $scope.pictureType = response.data.type;
        console.log("jxkxokzeokcoze",$scope.pictureType);
    },
    function(response){
        console.log("KO -> ", response);
    });

    $scope.LikeLastPictureAction = function(){
      $http.get("/likeLastPicture").then(
        function(response){
            console.log("OK ->",response);
        },
        function(response){
            console.log("KO -> ", response);
        });
    };

    $scope.TakePictureAction = function(){
      $http.get("/takePicture").then(function(response){
        console.log("OK ->",response);
      },
      function(response){
          console.log("KO -> ", response);
      });
    };

    $scope.HeartOnYouAction = function(){
      $http.get("/heartOnYou").then(function(response){
        console.log("OK ->",response);
      },
      function(response){
          console.log("KO -> ", response);
      });
    };

}]);

// create the controller and inject Angular's $scope
App.controller('adminController', ['$scope','$http','$location', function($scope,$http,$location) {

    // create a message to display in our view
    $scope.message = 'Bouineur 3.0';
    $scope.process = [];
    $http.get("/currentProcess").then(function(response){
      console.log("OK truc->",response.data[0]);

      $scope.process = response.data;
    },
    function(response){
        console.log("KO truc-> ", response);
    });


    $scope.actionsOnProcess = function(processName,action){
        var data = {};
        data.processName = processName;
        data.action = action;

        $http.post('/actionsProcess', data).then(function(response){
          console.log("OK actions->",response);
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
      }
    };




}]);
