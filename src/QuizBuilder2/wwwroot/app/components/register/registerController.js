(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for Sign-up page
     */
    var registerController = function($scope, $state, userService) {
        $scope.errors = [];

        $scope.register = function() {
            var user = $scope.user;
            
            userService.Register(user.email, user.password, user.confirmPassword).then(function(response) {
                if (response.errors.length) {
                    $scope.errors = response.errors;
                }
                else {
                    $state.go('home');
                }
            });
        }
    }
    
    app.controller('RegisterCtrl', ['$scope', '$state', 'userService', registerController]);
    
})();