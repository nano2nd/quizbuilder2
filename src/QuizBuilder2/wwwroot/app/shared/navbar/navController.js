(function() {

    var app = angular.module('quizBuilder');
    
    var navController = function($scope, $state, $rootScope, userService) {
        
        $scope.items =  $state.get().filter(function(state) {
            return state.nav;
        });
        
        $scope.user = userService.LoggedInUser();
        $scope.isLoggedIn = $scope.user != null;
        $scope.templateUrl = 'app/shared/navbar/navbar.html';
        
        $scope.logOut = function() {
            userService.LogOut().then(function() {
                $state.go("login");
                $rootScope.apply();
            });
        }
        
        $rootScope.$on('updateUser', function() {
            $scope.user = userService.LoggedInUser();
        });      
    }

    app.controller('NavCtrl', ['$scope', '$state', '$rootScope', 'userService', navController]);
    
})();