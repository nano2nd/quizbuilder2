(function() {
    var app = angular.module('quizBuilder');
    
    var quizService = function($q, quizDataService) {        
        
        var getQuizData = function (quizId) {
            return quizDataService.GetQuiz(quizId).then(function(quiz) {
                return quiz;
            });
        }
        
        return {
            getQuizData: getQuizData
        }
    }
    app.factory('quizService', ['$q', 'quizDataService', quizService]);
})();