(function() {
    var app = angular.module('quizBuilder');
    
    var quizService = function($q, dataService) {        
        
        var quizData = function (quizId) {
            return dataService.GetQuiz(quizId).then(function(quiz) {
                return quiz;
            });
        }
        
        return {
            quizData: quizData
        }
    }
    app.factory('quizService', ['$q', 'dataService', quizService]);
})();