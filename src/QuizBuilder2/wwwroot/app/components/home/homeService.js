(function() {
    var app = angular.module('quizBuilder');
    
    var homeService = function($q, quizDataService) {        
        var limit = 10;
        
        var data = function (page) {
            if (page) {
                var skip = (parseInt(page)-1) * 10;
            }
            
            return quizDataService.GetQuizzes(limit, skip).then(function(results) {
                return results;
            });
        }
        
        return {
            data: data
        }  
    }
    app.factory('homeService', ['$q', 'quizDataService', homeService]);
})();