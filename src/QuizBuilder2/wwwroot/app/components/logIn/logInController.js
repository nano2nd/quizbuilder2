(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for Sign-up page
     */
    var logInController = function($scope, $state, $location, userService) {
        $scope.errors = [];

        $scope.logIn = function() {
            var user = $scope.user;
            userService.LogIn(user.userName, user.password, user.rememberMe).then(function(data) {
                if (data.errors.length) {
                    $scope.errors = data.errors;
                }
                else {
                    if ($state.params.returnUrl)
                        $location.path($state.params.returnUrl);
                    else
                    $state.go('home');
                        
                }
            });
        }
    }
    
    app.controller('LogInCtrl', ['$scope', '$state', '$location', 'userService', logInController]);
    
})();