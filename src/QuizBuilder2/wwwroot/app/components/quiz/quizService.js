(function() {
    var app = angular.module('quizBuilder');
    
    var quizService = function($q, dataService) {        
        
        var getQuizData = function (quizId) {
            return dataService.GetQuiz(quizId).then(function(quiz) {
                return quiz;
            });
        }
        
        return {
            getQuizData: getQuizData
        }
    }
    app.factory('quizService', ['$q', 'dataService', quizService]);
})();