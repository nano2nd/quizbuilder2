(function() {

    var app = angular.module('quizBuilder');
    
    var navController = function($scope, $state, $rootScope, userService) {
        
        $scope.items =  $state.get().filter(function(state) {
            return state.nav;
        });
        
        $scope.user = qb_LOGGED_IN_USER;

        $scope.isLoggedIn = function() {
            return $scope.user != null;
        }
        $scope.templateUrl = 'app/shared/navbar/navbar.html';
        
        $scope.logOut = function() {
            userService.LogOut().then(function(data) {
                if (data.content == "success") {
                    $scope.user = null;
                    $state.go("login");
                }
            });
        }

        $rootScope.$on('updateUser', function(event, user) {
            $scope.user = user;
        });   
    }

    app.controller('NavCtrl', ['$scope', '$state', '$rootScope', 'userService', navController]);
    
})();