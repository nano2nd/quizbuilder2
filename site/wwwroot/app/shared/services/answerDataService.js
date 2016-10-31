(function() {
    
    var app = angular.module('quizBuilder');
    
    var answerDataService = function($q, $rootScope, $log, $http) {

        var saveAnswer = function(answer) {
            return $http.post('api/answer/saveanswer', {
                    answerModel: answer
                }).then(function(response) {
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

        return {
            SaveAnswer: saveAnswer,
            RemoveAnswer: removeAnswer
        };
    }
    
    // register the service
    app.factory('answerDataService', ['$q', '$rootScope', '$log', '$http', answerDataService]);
        
})();