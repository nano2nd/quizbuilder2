(function() {
    
    var app = angular.module('quizBuilder');

    var questionDataService = function($q, $rootScope, $log, $http, outcomeDataService) {

        var saveQuestion = function(question) {
            return $http.post('api/question/savequestion', {
                    questionModel: question
                }).then(function(response) {
                    return response.data;
                });
        }

        var removeQuestion = function(question) {
            return $http.post('api/question/removequestion', {
                questionId: question.id
            }).then(function(response) {
                return response.data;
            });
        }

        var updatePoints = function(question, points, outcomes) {
            return $http.post('api/question/updatepoints', {
                questionId: question.id,
                points: points
            }).then(function(response) {
                question.answers.forEach(function(a) {
                    a.answerOutcomes.forEach(function(ao) {
                        var outcome = Utilities.find(outcomes, 'id', ao.outcomeId);
                        outcomeDataService.UpdatePp(outcome);
                    });
                });
                return response.data;
            });
        }

        var saveFromQuickEntry = function(questions) {
            return $http.post('api/question/saveFromQuickEntry', {
                questions: questions
            }).then(function(response) {
                return response.data;
            });
        }
                
        return {
            UpdatePoints: updatePoints,
            SaveQuestion: saveQuestion,
            RemoveQuestion: removeQuestion,
            SaveFromQuickEntry: saveFromQuickEntry
        }
    }
    
    // register the service
    app.factory('questionDataService', ['$q', '$rootScope', '$log', '$http', 'outcomeDataService', questionDataService]);
    
})();