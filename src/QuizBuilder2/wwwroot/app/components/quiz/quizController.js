(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for quiz page
     */
    var quizController = function($scope, $state, dataService, quizDataService, confirmToast, quizData) {
        
        $scope.quiz = quizData;
        $scope.quiz.newQuizTitle = quizData.title;
        
        $scope.editTitle = function(question) {
            $('#changeTitle').modal();
        }
        
        $scope.saveTitle = function(dialog) {
            quizDataService.ChangeQuizTitle($scope.quiz.id, $scope.quiz.newQuizTitle).then(function(newTitle) {
                $scope.quiz.title = newTitle;
                dialog.close();    
            });
        }
        
        $scope.editPoints = function(question) {
            $('#questionPoints').modal();
            $scope.selectedQuestion = question;
            $scope.selectedQuestion.points = question.points;
        }
        
        $scope.savePoints = function(dialog) {
            dataService.SaveQuestion($scope.selectedQuestion, null, $scope.selectedQuestion.points).then(function() {
                dialog.close();
            });
        }
        
        $scope.updateRemainingPoints = function() {
            var questions = $scope.quiz.questions;
            if (questions.length) {
                $scope.remainingPoints = 200 - questions.map(function(q) {
                    return q.points;  
                }).reduce(function(prev, current) {
                    return prev + current;
                });
            } else {
                $scope.remainingPoints = 200;
            }
        }
        
        $scope.removeQuiz = function() {
            confirmToast('Are you sure you want to remove this quiz and all of its questions?', function(yes) {
                if (yes) {
                    quizDataService.RemoveQuiz($scope.quiz).then(function() {
                        $state.go('home');
                    });
                }
            });
        }
        
        $scope.removeOutcome = function(outcome) {
            confirmToast('Are you sure you want to remove this Outcome and'
                          + ' all of its connections?', function(yes) {
                if (yes) {
                    dataService.RemoveOutcome(outcome, $scope.quiz).then(function() {
                        if ($state.params.outcomeId == outcome.id) {
                            $state.go('^.questions');
                        }
                    });
                }          
            });
        }
        
        $scope.$watch('selectedQuestion.points', function() {
            $scope.updateRemainingPoints();
        });
        
        $scope.$on('updatePp', function (event, outcome) {
            dataService.UpdateAllOutcomePp($scope.quiz);
        });    
    }
    
    app.controller('QuizCtrl', ['$scope', '$state', 'dataService', 'quizDataService', 'confirmToast', 'quizData', quizController]);
    
})();