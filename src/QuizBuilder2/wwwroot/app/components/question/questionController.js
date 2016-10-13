(function() {
 
    var app = angular.module('quizBuilder');

    var questionController = function($scope, $state, $stateParams,
        questionDataService, answerDataService, outcomeDataService, 
        confirmToast, quizData
    ) {
        
        $scope.newQuestion = {
            id: null,
            text: '',
            points: 20,
            quizId: quizData.id
        };
        
        if ($stateParams.questionId) {
            $scope.currentQuestion = Utilities.find(quizData.questions, 'id', $stateParams.questionId);
            copyQuestion($scope.currentQuestion, $scope.newQuestion);
        }
        
        $scope.saveQuestion = function() {           
            questionDataService.SaveQuestion($scope.newQuestion).then(function(savedQuestion) {
                if ($scope.currentQuestion) {
                    copyQuestion($scope.currentQuestion, $scope.newQuestion);
                } else {
                    quizData.questions.push(savedQuestion);
                }

                $scope.updateRemainingPoints();
                $state.go('^.questions');
            });
        }
        
        $scope.removeQuestion = function() {
            confirmToast('Are you sure you want to remove this question and all of its answers?', function(yes) {
                if (yes) {
                    questionDataService.RemoveQuestion($scope.currentQuestion).then(function(isDeleted) {
                        if (isDeleted) {
                            Utilities.remove(quizData.questions, 'id', $scope.currentQuestion.id);
                            $scope.updateRemainingPoints();
                        }
                        $state.go('^.questions');
                    });
                }
            });
        }
        
        $scope.removeAnswer = function(answer, event) {
            confirmToast('Are you sure you want to remove this answer?', function(yes) {
                if (yes) {
                    answerDataService.RemoveAnswer(answer).then(function(isDeleted) {
                        if (isDeleted) {
                            Utilities.remove($scope.currentQuestion.answers, 'id', answer.id);
                        }
                    });
                }
            });
        }
        
        $scope.unlinkOutcome = function(answer, outcome) {
            outcomeDataService.UnlinkOutcomeFromAnswer(answer, outcome).then(function(didUnlink) {
                if (didUnlink)
                    Utilities.remove(answer.outcomes, 'id', outcome.id);
            });
        }        
        $scope.cancelQuestion = function() {
            if ($scope.previousState) {
                $state.go($scope.previousState.state, $scope.previousState.params);
            } else {
                $state.go('^.questions');
            }
        }

        function copyQuestion(src, dest) {
            dest.id = src.id;
            dest.text = src.text;
            dest.points = src.points;
        }
    }
    
    app.controller('QuestionCtrl', ['$scope', '$state', '$stateParams', 
        'questionDataService', 'answerDataService', 'outcomeDataService', 
        'confirmToast', 'quizData', questionController]);
 })();