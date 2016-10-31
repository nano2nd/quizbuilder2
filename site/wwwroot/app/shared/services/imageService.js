(function() {
    
    var app = angular.module('quizBuilder');

    var imageService = function($q, $rootScope, $log, $http, userService) {
        
        var urlForImageFile = function(imageFile) {
            var deferred = $q.defer();
            var reader  = new FileReader();
            reader.onloadend = function () {
                deferred.resolve(reader.result);
            }

            if (imageFile) {
                reader.readAsDataURL(imageFile);
            } else {
                deferred.reject({
                    error: 'file has no value'
                });
            }
            return deferred.promise;
        }
        
        var removeImageFromAnswer = function(answer) {
            var deferred = $q.defer();
            
            answer.get('image').destroy().then(function(removedAnswer) {
                answer.set('image', null);
                return answer.save().then(function() {
                    deferred.resolve(removedAnswer); 
                });
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            return deferred.promise;
        }
        
        return {
            UrlForImageFile: urlForImageFile,
            RemoveImageFromAnswer: removeImageFromAnswer
        };
    }
    
    // register the service
    app.factory('imageService', ['$q', '$rootScope', '$log', '$http', 'userService', imageService]);
    
})();