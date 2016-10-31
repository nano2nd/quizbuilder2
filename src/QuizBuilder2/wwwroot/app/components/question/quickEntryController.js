(function() {
 
    var app = angular.module('quizBuilder');

    var quickEntryController = function($scope, $state, $stateParams,
        questionDataService, answerDataService, outcomeDataService, 
        confirmToast, quizData
    ) {
        $scope.quizEntries = [];

        var numberOfQuestions = 15;
        var numberOfAnswers = 8;

        for(var qCount = 0; qCount < numberOfQuestions; qCount++) {
            var newQuestion = {
                text: '',
                quizId: quizData.id,
                answers: []
            };

            for(var aCount = 0; aCount < numberOfAnswers; aCount++) {
                newQuestion.answers.push({
                    text: ''
                });
            }


            $scope.quizEntries.push(newQuestion);
        }
        
        $scope.save = function() {
            // Prune empty questions
            var filledEntries = $scope.quizEntries.filter(function(question) {
                return question.text.trim();
            });

            // Prune empty answers
            filledEntries.forEach(function(entry) {
                entry.answers = entry.answers.filter(function(answer) {
                    return answer.text.trim();
                });
            });

            questionDataService.SaveFromQuickEntry(filledEntries).then(function(newQuestions) {
                newQuestions.forEach(function(q) {
                    quizData.questions.push(q);
                });
                
                $scope.updateRemainingPoints();
                $state.go('^.questions');
            });
        }
    }
    
    app.controller('QuickEntryCtrl', ['$scope', '$state', '$stateParams', 
        'questionDataService', 'answerDataService', 'outcomeDataService', 
        'confirmToast', 'quizData', quickEntryController]);
 })();