//quizEmulatorQuestionController

(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for quiz page
     */
    var quizEmulatorQuestionController = function($scope, $state, quizEmulatorService, quizQuestionData) {
        
        $scope.$parent.currentQuestionIndex = parseInt($state.params.questionIndex);
        $scope.$parent.currentQuestion = quizQuestionData;

        $scope.question = quizQuestionData;

        $scope.getImageUrl = function(imagePath) {
            return 'api/storage/quizbuilder-photos/' + imagePath;
        };

        $scope.selectOption = function(answer) {
            $scope.question.selectedAnswer = answer;
        }

    }
    
    app.controller('quizEmulatorQuestionCtrl', ['$scope', '$state', 'quizEmulatorService', 'quizQuestionData', quizEmulatorQuestionController]);
    
})();