(function() {
    var app = angular.module('quizBuilder');
    
    var homeService = function($q, quizDataService) {        
        
        var limit = 10;
        
        var data = function (page) {
            if (page) {
                var skip = (parseInt(page)-1) * limit;
            }
            
            var promises = [
                quizDataService.GetQuizzes(limit, skip),
                quizDataService.GetQuizCount()
            ];

            return $q.all(promises).then(function(results) {
                return {
                    quizzes: results[0],
                    quizCount: results[1]
                };
            });
        }
        
        return {
            data: data
        }  
    }
    app.factory('homeService', ['$q', 'quizDataService', homeService]);
})();