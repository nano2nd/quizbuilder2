(function() {
    
    var app = angular.module('quizBuilder');
    
    app.factory('confirmToast', ['$rootScope', function($rootScope) {
        var callback;
        var html = '<div class="btn-group confirm-buttons clearfix" role="group" aria-label="confirm">'
                +  ' <button type="button" class="btn btn-danger">No</button>'
                +  ' <button type="button" class="btn btn-success">Yes</button>'
                +  '</div>'
        
        var show = function(message, callback) {
            callback = callback;
            toastr.warning(message + html, null, {
                timeOut: 0,
                extendedTimeOut: 0,
                positionClass: 'toast-top-center',
                showMethod: 'slideDown',
                hideMethod: 'slideUp',
                hideDuration: 100,
                showDuration: 100,
                preventDuplicates: true
            });     
            
            $('.confirm-buttons .btn').click(function(event) {
                if ($(event.target).hasClass('btn-danger')) {
                    callback(false);
                }
                if ($(event.target).hasClass('btn-success')) {
                    callback(true);
                }
                $rootScope.$apply();
            });
            
        }
        
        return show;
    }]);
    
})();