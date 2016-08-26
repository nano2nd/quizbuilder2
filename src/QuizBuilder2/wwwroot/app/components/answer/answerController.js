(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $stateParams, $state, dataService, quizData) {
        
        $scope.currentQuestion = Utilities.find(quizData.questions, 'id', $stateParams.questionId);  
        $scope.answers = $scope.currentQuestion.answers;
        $scope.currentAnswer = {
            answerText: '',
            image: null,
            showImageOnly: false
        }
        
        if ($stateParams.answerId) {
            $scope.currentAnswer = Utilities.find($scope.answers, 'id', $stateParams.answerId);
        }
        
        $scope.uploadImage = function(files) {
           if (files[0].size <= 768000) { //768 KB
               $scope.currentAnswer.newImage = files[0];
               dataService.UrlForImageFile(files[0]).then(function(encodedUrl) {
                   $scope.currentAnswer.imageUrl = encodedUrl;
               });
           } else {
               toastr.error('Image is too large, must be under 768KB');
           }
        }
        
        $scope.removeImage = function(event) {
            event.preventDefault();
            dataService.RemoveImageFromAnswer($scope.currentAnswer).then(function() {
                toastr.success('Image removed from answer');
                $scope.currentAnswer.newImage = null;
                $scope.currentAnswer.imageUrl = null;
            });
        }
        
        $scope.saveAnswer = function() {           
            dataService.SaveAnswer(
                $scope.currentAnswer,
                $scope.currentAnswer.answerText,
                $scope.currentAnswer.newImage,
                $scope.currentAnswer.showImageOnly,
                $scope.currentQuestion).then(function() {
                    $state.go('^.question-answers', {questionId: $scope.currentQuestion.id});
                });
        }
        
        $scope.cancelAnswer = function() {
            if ($scope.previousState && !$scope.previousState.state.abstract) {
                $state.go($scope.previousState.state, $scope.previousState.params);
            } else {
                $state.go('^.question-answers', $state.params);
            }
        }
    }
    
    app.controller('AnswerCtrl', ['$scope', '$stateParams', '$state', 'dataService', 'quizData', controller]);
})();