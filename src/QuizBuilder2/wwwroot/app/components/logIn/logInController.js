(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for Sign-up page
     */
    var logInController = function($scope, $state, userService) {
        $scope.errors = [];

        $scope.logIn = function() {
            var user = $scope.user;
            userService.LogIn(user.userName, user.password).then(function(response) {
                if (response.errors) {
                    $scope.errors = response.errors;
                }
                else {
                    $state.go('home');
                }
            });
        }
    }
    
    app.controller('LogInCtrl', ['$scope', '$state', 'userService', logInController]);
    
})();