(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for Sign-up page
     */
    var logInController = function($scope, $state, userService) {
        
        $scope.logIn = function() {
            var user = $scope.user;
            userService.LogIn(user.userName, user.password).then(function(user) {
                $state.go('home');
            }, function(error) {
                $scope.loginFailed = true;
            });
        }
    }
    
    app.controller('LogInCtrl', ['$scope', '$state', 'userService', logInController]);
    
})();