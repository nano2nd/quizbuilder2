(function() {
    var app = angular.module('quizBuilder');
    
    var quizService = function($q, dataService) {        
        
        var quizData = function (quizId) {
            return dataService.GetQuiz(quizId);
        }
        
        return {
            quizData: quizData
        }
    }
    app.factory('quizService', ['$q', 'dataService', quizService]);
})();