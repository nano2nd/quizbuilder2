(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $stateParams, $state, answerDataService, quizData, imageService) {
        
        $scope.currentQuestion = Utilities.find(quizData.questions, 'id', $stateParams.questionId);  
        $scope.answers = $scope.currentQuestion.answers;
        
        $scope.newAnswer = {
            id: null,
            text: '',
            isPhotoOnly: false,
            questionId: $scope.currentQuestion.id,
            photoSource: null
        }

        $scope.imageData = {
            imageFile: null,
            imageUrl: null,
            imageSource: null
        }
        
        if ($stateParams.answerId) {
            $scope.currentAnswer = Utilities.find($scope.answers, 'id', $stateParams.answerId);
            
            if ($scope.currentAnswer.photoPath) {
                $scope.imageData.imageUrl = 'api/storage/quizbuilder-photos/' + $scope.currentAnswer.photoPath;
            }
            
            copyAnswer($scope.currentAnswer, $scope.newAnswer);
        }
        
        $scope.saveAnswer = function() {           
            answerDataService.SaveAnswer($scope.newAnswer, $scope.imageData).then(function(savedAnswer) {
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
            $scope.removeImage();

            if (files[0].size <= 4000000) { // 4MB
               $scope.imageData.imageFile = files[0];

               imageService.UrlForImageFile(files[0]).then(function(encodedUrl) {
                   $scope.imageData.imageUrl = encodedUrl;
               });
           } else {
               toastr.error('Image is too large, must be less than 4MB');
           }
        }
        
        $scope.removeImage = function(event) {
            if (event)
                event.preventDefault();
                
            $scope.newAnswer.photoPath = null;
            $scope.newAnswer.photoId = null;
            $scope.newAnswer.photoSource = null;

            $scope.imageData.imageFile = null;
            $scope.imageData.imageUrl = null;
        }

        function copyAnswer(src, dest) {
            dest.id = src.id;
            dest.text = src.text;
            dest.isPhotoOnly = src.isPhotoOnly;
            dest.questionId = src.questionId;
            dest.photoPath = src.photoPath;
            dest.photoId = src.photoId;
            dest.photoSource = src.photoSource;
        }
    }
    
    app.controller('AnswerCtrl', ['$scope', '$stateParams', '$state', 
        'answerDataService', 'quizData', 'imageService', controller]);
})();