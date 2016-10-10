(function() {

    var app = angular.module('quizBuilder');

    /**
     * Controller for quiz page
     */
    var quizController = function($scope, $state, quizDataService, questionDataService, 
        outcomeDataService, confirmToast, quizData) {
        
        $scope.quiz = quizData;
        $scope.newQuizTitle = {title: quizData.title }
        
        $scope.editTitle = function(question) {
            $('#changeTitle').modal();
        }
        
        $scope.saveTitle = function(dialog) {
            quizDataService.SaveQuiz({
                title: $scope.newQuizTitle.title,
                id: $scope.quiz.id,
                sumary: $scope.quiz.summary
            }).then(function(savedQuiz) {
                $scope.quiz.title = savedQuiz.title;
                dialog.close();    
            });
        }
        
        $scope.editPoints = function(question) {
            $('#questionPoints').modal();
            $scope.selectedQuestion = question;
            $scope.selectedQuestion.newPoints = question.points;
        }
        
        $scope.savePoints = function(dialog) {
            questionDataService.UpdatePoints($scope.selectedQuestion.id, $scope.selectedQuestion.newPoints).then(function(points) {
                $scope.selectedQuestion.points = points;
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
                    quizDataService.RemoveQuiz($scope.quiz.id).then(function() {
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
            outcomeDataService.UpdateAllOutcomePp($scope.quiz);
        });    
    }
    
    app.controller('QuizCtrl', ['$scope', '$state', 'quizDataService', 
        'questionDataService', 'outcomeDataService', 'confirmToast', 'quizData', quizController]);
    
})();