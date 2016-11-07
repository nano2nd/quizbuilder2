(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $stateParams, $state, answerDataService, quizData, imageService) {
        
        $scope.currentQuestion = Utilities.find(quizData.questions, 'id', $stateParams.questionId);  
        $scope.answers = $scope.currentQuestion.answers;
        
        $scope.newAnswer = {
            id: null,
            text: '',
            isImage: false,
            imageFileName: null,
            questionId: $scope.currentQuestion.id
        }

        $scope.imageFile = null;
        $scope.imageUrl = null;
        
        if ($stateParams.answerId) {
            $scope.currentAnswer = Utilities.find($scope.answers, 'id', $stateParams.answerId);
            copyAnswer($scope.currentAnswer, $scope.newAnswer);
        }
        
        $scope.saveAnswer = function() {           
            answerDataService.SaveAnswer($scope.newAnswer, $scope.imageFile).then(function(savedAnswer) {
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
                    answerDataService.RemoveAnswer($scope.currentAnswer).then(function(isDeleted) {
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
           if (files[0].size <= 4000000) { // 4MB
               $scope.imageFile = files[0];
               $scope.newAnswer.imageFileName = files[0].name;

               imageService.UrlForImageFile(files[0]).then(function(encodedUrl) {
                   $scope.imageUrl = encodedUrl;
               });
           } else {
               toastr.error('Image is too large, must be less than 4MB');
           }
        }
        
        $scope.removeImage = function(event) {
            event.preventDefault();
            $scope.imageFile = null;
            $scope.imageUrl = null;
        }

        function copyAnswer(src, dest) {
            dest.id = src.id;
            dest.text = src.text;
            dest.isImage = src.isImage;
            dest.imageFileName = src.imageFileName;
            dest.questionId = src.questionId;
        }
    }
    
    app.controller('AnswerCtrl', ['$scope', '$stateParams', '$state', 
        'answerDataService', 'quizData', 'imageService', controller]);
})();