(function() {
    
    var app = angular.module('quizBuilder');
    
    var answerDataService = function($q, $rootScope, $log, $http, imageService) {

        var saveAnswer = function(answer, imageData) {
            var deferred = $q.defer();

            $http.post('api/answer/saveanswer', {
                answerModel: answer
            }).then(function(response) {
                var savedAnswer = response.data;
                if (imageData.imageFile) {
                    imageService.UploadImage(
                        imageData, 'api/answer/uploadphoto/' + savedAnswer.id
                    ).then(function(savedAnswerWithPhoto) {
                        deferred.resolve(savedAnswerWithPhoto);
                    });
                } else {
                    deferred.resolve(response.data);
                }
            });

            return deferred.promise;
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