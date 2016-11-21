(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for quiz page
     */
    var quizEmulatorController = function($scope, $state, quizEmulatorData) {
        
        $scope.quiz = quizEmulatorData;
        $scope.currentQuestionIndex = 0;
        $scope.currentQuestion = {};

        $scope.isQuestion = function() {
            return $state.current.name != 'play.intro' && $state.current.name != 'play.finish';
        }

        $scope.isAllAnswered = function() {
            var isDone = true;
            $scope.quiz.questions.forEach(function(q) {
                if (!q.selectedAnswer) {
                    isDone = false;
                }
            });

            return isDone;
        }
    }
    
    app.controller('QuizEmulatorCtrl', ['$scope', '$state', 'quizEmulatorData', quizEmulatorController]);
    
})();