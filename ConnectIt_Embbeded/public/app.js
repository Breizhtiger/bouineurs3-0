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


// create the controller and inject Angular's $scope
App.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Bouineur 3.0';
});

// create the controller and inject Angular's $scope
App.controller('boardController',['$scope','$http', function($scope,$http) {
    // create a message to display in our view
    $scope.message = 'Bouineur 3.0';


    $http.get("/lastPicture").then(function(response){
      console.log("OK ->",response);
        $scope.picturePath = response.data.path;
    },
    function(response){
        console.log("KO -> ", response);
    });


    $scope.TakePictureAction = function(){
      $http.get("/takePicture").then(function(response){
        console.log("OK ->",response);
      },
      function(response){
          console.log("KO -> ", response);
      });
    };
}]);

// create the controller and inject Angular's $scope
App.controller('adminController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Bouineur 3.0';
});
