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
App.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Bouineurs 3.0';
});

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
App.controller('adminController', function($scope,$location) {
    // create a message to display in our view
    $scope.message = 'Bouineur 3.0';

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


});
