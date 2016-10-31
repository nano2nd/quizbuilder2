(function() {
    var app = angular.module('quizBuilder');
    
    var outcomeService = function($q, outcomeDataService) {        
        
        var rolesForOutcome = function (outcomeId) {

            // var outcomeQuery = dataService.Query('Outcome');
            // outcomeQuery.equalTo('objectId', outcomeId);
            // return outcomeQuery.first().then(function(outcome) {
            //     return dataService.GetRolesForOutcome(outcome).then(function(outcomeToRoles) {
            //         var rolesPromises = [];
            //         outcomeToRoles.forEach(function(outcomeToRole) {
            //             outcomeToRole.role = outcomeToRole.get('role');
            //             rolesPromises.push(outcomeToRole.role.fetch());
            //             outcomeToRole.value = outcomeToRole.get('value');
            //         });
            //         return $q.all(rolesPromises).then(function(roles) {
            //             return outcomeToRoles.sort(function(object1, object2) {
            //                 return object1.get('role').get('name')
            //                     .localeCompare(object2.get('role').get('name'));
            //             });
            //         });
            //     });
            // });
        }
        
        var newRolesForOutcome = function() {
            return outcomeDataService.GetRolesForOutcome();
        }
        
        return {
            rolesForOutcome: rolesForOutcome,
            newRolesForOutcome: newRolesForOutcome
        }
    }
    app.factory('outcomeService', ['$q', 'outcomeDataService', outcomeService]);
})();