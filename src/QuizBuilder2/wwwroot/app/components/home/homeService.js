(function() {
    var app = angular.module('quizBuilder');
    
    var homeService = function($q, dataService) {        
        var limit = 10;
        
        var data = function (page) {
            if (page) {
                var skip = (parseInt(page)-1) * 10;
            }
            
            return $q.all([
                dataService.GetQuizzes(limit, skip),
                dataService.GetQuizCount()
            ]).then(function(results) {
                return {
                    quizzes: results[0],
                    quizCount: results[1]
                }
            });
            
            return data;
        }
        
        return {
            data: data
        }  
    }
    app.factory('homeService', ['$q', 'dataService', homeService]);
})();