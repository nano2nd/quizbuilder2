(function() {
    
    var app = angular.module('quizBuilder');
    
    var answerDataService = function($q, $rootScope, $log, $http, imageService) {

        var saveAnswer = function(answer, imageFile) {
            return $http.post('api/answer/saveanswer', {
                    answerModel: answer
                }).then(function(response) {
                    if (imageFile) {
                        imageService.UploadImage(imageFile, 'api/answer/uploadphoto/' + response.data.id);
                    }

                    return response.data;
                });
        }

        var removeAnswer = function(answer) {
            return $http.post('api/answer/removeanswer', {
                answerId: answer.id
            }).then(function(response) {
                return response.data;
            });
        }

         var removeImageFromAnswer = function(answer) {
            var deferred = $q.defer();
            
            deferred.resolve(answer);
            return deferred.promise;
        }

        return {
            SaveAnswer: saveAnswer,
            RemoveAnswer: removeAnswer,
            RemoveImageFromAnswer: removeImageFromAnswer
        };
    }
    
    // register the service
    app.factory('answerDataService', ['$q', '$rootScope', '$log', '$http', 'imageService', answerDataService]);
        
})();