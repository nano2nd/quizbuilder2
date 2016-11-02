(function() {
    var app = angular.module('quizBuilder');
    
    var outcomeService = function($q, outcomeDataService) {        
            
        var newRolesForOutcome = function() {
            return outcomeDataService.GetRolesForOutcome();
        }
        
        return {
            newRolesForOutcome: newRolesForOutcome
        }
    }
    app.factory('outcomeService', ['$q', 'outcomeDataService', outcomeService]);
})();