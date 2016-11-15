(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $state, outcomeDataService, imageService, confirmToast, quizData, characterRoles) {
        
        $scope.newOutcome = {
            id: null,
            name: '',
            summary: '',
            photoSource: null,
            quizId: quizData.id
        }
        
        $scope.imageData = {
            imageFile: null,
            imageUrl: null,
            imageSource: null
        }

        $scope.pointsAvailable = 100;
        
        if ($state.params.outcomeId) {
            $scope.outcome = Utilities.find(quizData.outcomes, 'id', $state.params.outcomeId);

            if ($scope.outcome.photoPath) {
                $scope.imageData.imageUrl = 'api/storage/quizbuilder-photos' + '/' + $scope.outcome.photoPath;
            }

            copyOutcome($scope.outcome, $scope.newOutcome);

        } else {
            $scope.newOutcome.characterRoleOutcomes = characterRoles;
        }    
        
        $scope.saveOutcome = function() {           
            outcomeDataService.SaveOutcome($scope.newOutcome, $scope.imageData).then(function(savedOutcome) {
                if ($scope.outcome) {
                    copyOutcome(savedOutcome, $scope.outcome);
                } else {
                    quizData.outcomes.push(savedOutcome);
                }
                $state.go('^.questions');
            });
        }

        $scope.pointsUsed = function() {
            return $scope.newOutcome.characterRoleOutcomes.map(function(role) {
                return role.value;
            }).reduce(function(currentRoleValue, prevRoleValue) {
                return prevRoleValue + currentRoleValue; 
            });
        }
        
        $scope.pointsLeft = function() {
            return $scope.pointsAvailable - $scope.pointsUsed();
        }
        
        $scope.onSliderChangeStart = function(role) {
            role.currentMax = role.value + $scope.pointsLeft()
        }
        
        $scope.onSliderChange = function(role) {
            if (role.value >= role.currentMax) {
                role.value = role.currentMax;
            }
        }
        
        $scope.cancelOutcome = function() {
            if ($scope.previousState && !$scope.previousState.state.abstract) {
                $state.go($scope.previousState.state, $scope.previousState.params);
            } else {
                $state.go('^.questions');
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
                
            $scope.newOutcome.photoPath = null;
            $scope.newOutcome.photoId = null;
            $scope.newOutcome.photoSource = null;

            $scope.imageData.imageFile = null;
            $scope.imageData.imageUrl = null;
        }

        $scope.tinymceOptions = {
            onChange: function(e) {
              alert('what');
            },
            inline: false,
            browser_spellcheck: true,
            content_style: 'div {margin: 10px; border: 5px solid red; padding: 3px}',
            menubar: false,
            plugins: 'code',
            toolbar: 'undo redo | bold italic | code'
        }

        function copyOutcome(src, dest) {
            dest.id = src.id;
            dest.name = src.name;
            dest.summary = src.summary;
            dest.quizId = src.quizId;
            dest.characterRoleOutcomes = src.characterRoleOutcomes;
            dest.topCharacterRole = src.topCharacterRole;
            dest.photoPath = src.photoPath;
            dest.photoId = src.photoId;
            dest.photoSource = src.photoSource;
        }
    }
    
    app.controller('OutcomeCtrl', ['$scope', '$state', 'outcomeDataService', 'imageService',
        'confirmToast', 'quizData', 'characterRoles', controller]);
})();