(function() {
    
    var app = angular.module('quizBuilder');

    var quizEmulatorService = function($q, $log, $http) {
        
        var updateOutcomePoints = function(quiz) {
            
            // clear totals
            quiz.outcomes.forEach(function(o) {
                o.resultPointTotal = 0;
            });

            quiz.questions.forEach(function(q) {
                if (q.selectedAnswer) {
                    q.selectedAnswer.answerOutcomes.forEach(function(ao) {
                        var outcome = Utilities.find(quiz.outcomes, 'id', ao.outcomeId);
                        outcome.resultPointTotal += q.points;
                    });
                }
            });
        }
        
        return {
            UpdateOutcomePoints: updateOutcomePoints
        };
    }
    
    // register the service
    app.factory('quizEmulatorService', ['$q', '$log', '$http', 'quizDataService', quizEmulatorService]);
    
})();