(function() {
    
    var app = angular.module('quizBuilder');
    
    app.directive('rgDrag', function() {
        
        return { 
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on('dragstart', function(event) {
                    event.originalEvent.dataTransfer.setData('outcomeId', scope.outcome.id);
                });
            }
        }
    });
    
    app.directive('rgDrop', ['outcomeDataService', function(outcomeDataService) {
        return { 
            restrict: "A",
            link: function(scope, element, attrs) {
                
                element.on('dragover', function(event) {
                    event.preventDefault();
                    return false;
                });
                
                element.on('drop', function(event) {
                    event.preventDefault();
                    var outcomeId = event.originalEvent.dataTransfer.getData('outcomeId');
                    
                    var outcome = Utilities.find(scope.$parent.$parent.quiz.outcomes, 'id', outcomeId);
                    outcomeDataService.LinkOutcomeToAnswer(scope.answer, outcome).then(function() {
                        scope.answer.outcomes.push(outcome);
                        // this then causes scope.$apply() 
                    });
                    return false;
                });
            }
        }
    }]);
    
})();