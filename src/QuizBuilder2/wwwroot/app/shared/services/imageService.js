(function() {
    
    var app = angular.module('quizBuilder');

    var imageService = function($q, $rootScope, $log, $http, userService) {
        
        var urlForImageFile = function(imageFile) {
            var deferred = $q.defer();
            var reader  = new FileReader();
            reader.onloadend = function () {
                deferred.resolve(reader.result);
            }

            if (imageFile) {
                reader.readAsDataURL(imageFile);
            } else {
                deferred.reject({
                    error: 'file has no value'
                });
            }
            return deferred.promise;
        }

        var uploadImage = function(imageData, url) {
            var data = new FormData();
            
            data.append(imageData.imageFile.name, imageData.imageFile)

            if (imageData.imageSource)
                data.append('source', imageData.imageSource);

            return $http.post(url, data, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(response) {
                return response.data;
            }).catch(function(error) {
                toastr.error('Image was unable to save');
            });
        }
        
        return {
            UrlForImageFile: urlForImageFile,
            UploadImage: uploadImage
        };
    }
    
    // register the service
    app.factory('imageService', ['$q', '$rootScope', '$log', '$http', 'userService', imageService]);
    
})();