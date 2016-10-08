(function() {    
    
    var app = angular.module('quizBuilder');

    var homeController = function($scope, $state, $stateParams, quizDataService, quizData) {
            
        $scope.quizzes = quizData.quizzes;
        $scope.count = quizData.quizCount;
        $scope.pages =  Math.ceil(quizData.quizCount / 10);
        $scope.page = parseInt($stateParams.page) || 1;
        
        // must bind to an object to update through directive
        $scope.newQuiz = {title: ''};
        
        // New quiz dialog
        $scope.saveQuiz = function(dialog) {
            dialog.close();
            quizDataService.SaveQuiz($scope.newQuiz, $scope.newQuiz.title)
                .then(function(quiz) {
                    $state.go('quiz.questions', { id: quiz.id });
                });
        }
        
        $scope.onQuizClick = function() {
            var quiz = this.quiz;
            //turn into ui-sref
            $state.go('quiz.questions', {id: quiz.id});
        }
    }

    app.controller('HomeCtrl', [
        '$scope', '$state', '$stateParams', 'quizDataService', 'quizData', homeController]);
    
})();