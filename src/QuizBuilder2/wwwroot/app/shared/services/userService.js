(function() {

    var app = angular.module('quizBuilder');
    
    var userService = function($q, $log, $rootScope, $http) {
        
        /**
         * [[Description]]
         * @param   {[[Type]]} username [[Description]]
         * @param   {[[Type]]} password [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var signUp = function(username, password) {
            var deferred = $q.defer();
            if (!username || !password) {
                var message = 'Blank username or password not allowed';
                deferred.reject({ message: message});
                $log.error(message);
                return deferred.promise;
            }

            var user = {};
            user.signUp({
                username: username,
                password: password
            }).then(function(user) {
                toastr.success(username + ' created');
                deferred.resolve(user);
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            return deferred.promise;
        }

        /**
         * [[Description]]
         * @param   {[[Type]]} username [[Description]]
         * @param   {[[Type]]} password [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var logIn = function(username, password, rememberMe) {
            return $http.post('api/account/login', {
                email: username,
                password: password,
                rememberMe: rememberMe || false
            }).then(function(response) {
                var user = response.data.content;
                qb_LOGGED_IN_USER = user;
                $rootScope.$broadcast('updateUser', user);
                return response.data;
            });
        }

        /**
         * [[Description]]
         * @param   {[[Type]]} username [[Description]]
         * @param   {[[Type]]} password [[Description]]
         * @param   {[[Type]]} confirmPassword [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var register = function(username, password, confirmPassword) {
            return $http.post('api/account/register', {
                email: username,
                password: password,
                confirmPassword: confirmPassword
            }).then(function(response) {
                if (response.data.content) {
                    var user = response.data.content;
                    qb_LOGGED_IN_USER = user;
                    $rootScope.$broadcast('updateUser', user);
                }
                return response.data;
            });
        }

        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var logOut = function() {
            return $http.post('api/account/logoff').then(function(response) {
                qb_LOGGED_IN_USER = null;
                return response.data;
            });
        }

        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var loggedInUser = function() {
            return $http.get('api/account/currentuser').then(function(response) {
                var user = response.data;
                qb_LOGGED_IN_USER = user;
                return user;  
            });
        }
        
        return {
            LogIn: logIn,
            LogOut: logOut,
            LoggedInUser: loggedInUser,
            Register: register
        }
    }
    
    app.factory('userService', ['$q', '$log', '$rootScope', '$http', userService]);

})();