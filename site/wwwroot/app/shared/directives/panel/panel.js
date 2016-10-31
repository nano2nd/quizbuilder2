(function() {
    var app = angular.module('quizBuilder');
    
    var myPanel = function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/shared/directives/panel/panel.html',
            link: function(scope, element, attrs) {
                element.find('.panel-title').text(attrs.panelTitle);
            }
        }
    }
    app.directive('myPanel', [myPanel]);
    
})();