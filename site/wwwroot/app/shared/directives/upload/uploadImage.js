(function() {
    
    var app = angular.module('quizBuilder');
    
    app.directive('rgUploadImage', function() {
        
        return { 
            restrict: 'E',
            link: function(scope, element, attrs) { 
                var $imageFile = $('#image_file');
                $imageFile.change(function() {
                    var imageFiles = $imageFile[0].files;
                    
                    // Images preview
//                    var $imageList = $('.upload-image-list');
//                    for(var i = 0; i < scope.imageFiles.length; i++) {
//                        if (i == 0) {
//                            $imageList.empty();
//                        }
//                        var reader  = new FileReader();
//                        reader.onloadend = function () {
//                            var $newListElement = $('<li></li>');
//                            var $newImageElement = $('<img>');
//                            $newImageElement[0].src = reader.result;
//                            $newListElement.append($newImageElement);
//                            $imageList.append($newListElement);
//                        }
//
//                        if (scope.imageFiles[i]) {
//                            reader.readAsDataURL(scope.imageFiles[i]);
//                        } else {
//                            scope.imageFiles[i].url = '';
//                        }
//                    }
                    if (imageFiles && imageFiles.length) {
                        scope.upload({
                            files : imageFiles
                        });
                    }
                    
                });
            },
            templateUrl: 'app/shared/directives/upload/uploadImage.html',
            scope: {
                'upload': '&onUpload'
            }
        }
    });
})();