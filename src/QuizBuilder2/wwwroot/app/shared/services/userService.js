(function() {

    var app = angular.module('quizBuilder');
    
    var userService = function($q, $log, $rootScope) {
        
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

            var user = new Parse.User();
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
        var logIn = function(username, password) {
            var deferred = $q.defer();    
            Parse.User.logIn(username.toLowerCase(), password).then(function(user) {
                $rootScope.$broadcast('updateUser');
                deferred.resolve(user);
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            return deferred.promise;
        }

        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var logOut = function() {
            var deferred = $q.defer();            
            Parse.User.logOut().then(function() {
                $rootScope.$broadcast('updateUser');
                deferred.resolve();
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            return deferred.promise;
        }

        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var loggedInUser = function() {
            return Parse.User.current();
        }
        
        return {
            LogIn: logIn,
            LogOut: logOut,
            LoggedInUser: loggedInUser
        }
    }
    
    app.factory('userService', ['$q', '$log', '$rootScope', userService]);

})();