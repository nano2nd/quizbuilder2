(function() {
 
    var app = angular.module('quizBuilder');

    var questionController = function($scope, $state, $stateParams, dataService, confirmToast, quizData) {
        
        $scope.currentQuestion = {
            questionText: '',
            points: 20
        }
        
        if ($stateParams.questionId) {
            $scope.currentQuestion = Utilities.find($scope.quiz.get('questions'), 'id', $stateParams.questionId);
            $scope.currentQuestion.questionText = $scope.currentQuestion.get('questionText');
            $scope.currentQuestion.points = $scope.currentQuestion.get('points');
        }
        
        $scope.saveQuestion = function() {           
            dataService.SaveQuestion(
                $scope.currentQuestion,
                $scope.currentQuestion.questionText,
                $scope.currentQuestion.points,
                $scope.quiz).then(function() {
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
        
        $scope.unlinkOutcome = function(answer, outcome) {
            dataService.UnlinkOutcomeForAnswer(answer, outcome);
        }
        
        $scope.cancelQuestion = function() {
            if ($scope.previousState) {
                $state.go($scope.previousState.state, $scope.previousState.params);
            } else {
                $state.go('^.questions');
            }
        }
    }
    
    app.controller('QuestionCtrl', ['$scope', '$state', '$stateParams', 'dataService', 
                                    'confirmToast', 'quizData', questionController]);
 
 })();