(function() {
    
    var app = angular.module('quizBuilder');
    
    var controller = function($scope, $state, dataService, confirmToast, quizData, rolesData) {
        
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
        
        $scope.pointsAvailable = 100;
        
        if ($state.params.outcomeId) {
            $scope.outcome = Utilities.find($scope.quiz.get('outcomes'), 'id', $state.params.outcomeId);
            $scope.outcome.name = $scope.outcome.get('name');
            $scope.outcome.image = null; // TODO: Get image here
        } else {
            $scope.outcome = {
                name: '',
                image: null,
                testValue: 50
            }
        }
        
        $scope.roles = rolesData;
        
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
        
        $scope.saveOutcome = function() {           
            dataService.SaveOutcome(
                $scope.outcome,
                $scope.outcome.name,
                $scope.outcome.summary,
                $scope.outcome.image,
                $scope.roles,
                $scope.quiz).then(function() {
                    $state.go('^.questions');
                });
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
    }
    
    app.controller('OutcomeCtrl', ['$scope', '$state', 'dataService', 'confirmToast', 'quizData', 'rolesData', controller]);
})();