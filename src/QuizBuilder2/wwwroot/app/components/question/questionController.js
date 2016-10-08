(function() {
 
    var app = angular.module('quizBuilder');

    var questionController = function($scope, $state, $stateParams, questionDataService, confirmToast, quizData) {
        
        $scope.newQuestion = {
            text: '',
            points: 20,
            quizId: null
        };
        
        if ($stateParams.questionId) {
            $scope.currentQuestion = Utilities.find(quizData.questions, 'id', $stateParams.questionId);
            
            $scope.newQuestion.id = $scope.currentQuestion.id;
            $scope.newQuestion.text = $scope.currentQuestion.text;
            $scope.newQuestion.points = $scope.currentQuestion.points;
            $scope.newQuestion.quizId = $scope.currentQuestion.quizId;
        }
        
        $scope.saveQuestion = function() {           
            questionDataService.SaveQuestion($scope.newQuestion).then(function(savedQuestion) {
                $scope.currentQuestion.text = savedQuestion.text;
                $scope.currentQuestion.points = savedQuestion.points;
                $scope.currentQuestion.quizId = savedQuestion.quizId;

                $scope.updateRemainingPoints();
                $state.go('^.questions');
            });
        }
        
        $scope.removeQuestion = function() {
            confirmToast('Are you sure you want to remove this question and all of its answers?', function(yes) {
                if (yes) {
                    dataService.RemoveQuestion($scope.currentQuestion, $scope.quiz).then(function() {
                        $scope.updateRemainingPoints();
                        $state.go('^.questions');
                    });
                }
            });
        }
        
        $scope.removeAnswer = function(answer, event) {
            confirmToast('Are you sure you want to remove this answer?', function(yes) {
                if (yes) {
                    dataService.RemoveAnswer(answer, $scope.currentQuestion);
                }
            });
        }
        
        $scope.unlinkOutcome = function(answerOutcome) {
            dataService.UnlinkOutcomeForAnswer(answerOutcome);
        }
        
        $scope.cancelQuestion = function() {
            if ($scope.previousState) {
                $state.go($scope.previousState.state, $scope.previousState.params);
            } else {
                $state.go('^.questions');
            }
        }
    }
    
    app.controller('QuestionCtrl', ['$scope', '$state', '$stateParams', 'questionDataService', 
                                    'confirmToast', 'quizData', questionController]);
 
 })();