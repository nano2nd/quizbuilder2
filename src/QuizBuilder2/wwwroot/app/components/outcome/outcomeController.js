(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $state, outcomeDataService, confirmToast, quizData) {
        
        $scope.newOutcome = {
            id: null,
            name: '',
            summary: '',
            imageFile: null,
            quizId: null
        }
        
        $scope.pointsAvailable = 100;
        
        if ($state.params.outcomeId) {
            $scope.outcome = Utilities.find(quizData.outcomes, 'id', $state.params.outcomeId);
            copyOutcome($scope.outcome, $scope.newOutcome);
        }
        
        $scope.roles = $scope.newOutcome.characterRoleOutcomes;
        
        $scope.saveOutcome = function() {           
            outcomeDataService.SaveOutcome($scope.newOutcome).then(function() {
                copyOutcome($scope.newOutcome, $scope.outcome);
                $state.go('^.questions');
            });
        }

        $scope.pointsUsed = function() {
            return $scope.roles.map(function(role) {
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
            dest.imageFile = src.imageFile;
            dest.quizId = src.quizId;
            dest.characterRoleOutcomes = src.characterRoleOutcomes;
        }
    }
    
    app.controller('OutcomeCtrl', ['$scope', '$state', 'outcomeDataService', 'confirmToast', 'quizData', controller]);
})();