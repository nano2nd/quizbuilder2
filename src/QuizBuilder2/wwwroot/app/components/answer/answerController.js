(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $stateParams, $state, answerDataService, quizData) {
        
        $scope.currentQuestion = Utilities.find(quizData.questions, 'id', $stateParams.questionId);  
        $scope.answers = $scope.currentQuestion.answers;
        
        $scope.newAnswer = {
            id: null,
            text: '',
            isImage: false,
            imageFile: null,
            questionId: null
        }
        
        if ($stateParams.answerId) {
            $scope.currentAnswer = Utilities.find($scope.answers, 'id', $stateParams.answerId);
            copyAnswer($scope.currentAnswer, $scope.newAnswer);
        }
        
        $scope.saveAnswer = function() {           
            answerDataService.SaveAnswer($scope.newAnswer).then(function(savedAnswer) {
                if ($scope.currentAnswer) {
                    copyAnswer(savedAnswer, $scope.currentAnswer);
                } else {
                    $scope.answers.push(savedAnswer);
                }
                $state.go('^.question-answers', {questionId: $scope.currentQuestion.id});
            });
        }

        $scope.removeAnswer = function() {
            confirmToast('Are you sure you want to remove this answer?', function(yes) {
                if (yes) {
                    answerDataService.RemoveAnswer($scope.currentAnswer.id).then(function(isDeleted) {
                        if (isDeleted) {
                            Utilities.remove($scope.answers, 'id', id);
                        }
                        $state.go('^.question-answers');
                    });
                }
            });
        }
        
        $scope.cancelAnswer = function() {
            if ($scope.previousState && !$scope.previousState.state.abstract) {
                $state.go($scope.previousState.state, $scope.previousState.params);
            } else {
                $state.go('^.question-answers', $state.params);
            }
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

        function copyAnswer(src, dest) {
            dest.text = src.text;
            dest.isImage = src.isImage;
            dest.imageFile = src.imageFile;
            dest.questionId = src.questionId;
        }
    }
    
    app.controller('AnswerCtrl', ['$scope', '$stateParams', '$state', 
        'answerDataService', 'quizData', controller]);
})();