(function() {
    var app = angular.module('quizBuilder');
    
    var saveDialog = function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/shared/directives/saveDialog/saveDialog.html',
            link: function(scope, element, attrs) {
                element.find('.modal-title').text(attrs.dialogTitle);
                element.find('.modal').attr('id', attrs.dialogId);
                element.find('.modal').attr('aria-labelledby', attrs.dialogId);
                
                element.find('form').submit(function(e) {    
                    scope.save({
                        dialog: {
                            close: function () {
                                element.find('.modal').modal('hide');
                                $('.modal-backdrop').remove();
                            }
                        }
                    });
                });
            },
            scope: {
                'save': '&onSave'
            }            
        }
    }
    app.directive('saveDialog', ['$rootScope', saveDialog]);
    
})();