//quizEmulatorQuestionController

(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for quiz page
     */
    var quizEmulatorOutcomeController = function($scope, $state, quizEmulatorService) {

        $scope.quiz = $scope.$parent.quiz;
        quizEmulatorService.UpdateOutcomePoints($scope.quiz);

        $scope.resultingOutcome = Utilities.findMax($scope.quiz.outcomes, 'resultPointTotal');

        
        $scope.getImageUrl = function(imagePath) {
            return 'api/storage/quizbuilder-photos/' + imagePath;
        };
    }
    
    app.controller('quizEmulatorOutcomeCtrl', ['$scope', '$state', 'quizEmulatorService', quizEmulatorOutcomeController]);
    
})();