(function() {
    
    var app = angular.module('quizBuilder');

    var outcomeDataService = function($q, $rootScope, $log, $http, userService, imageService) {
        
        var saveOutcome = function(outcome, imageData) {
            var deferred = $q.defer();

            $http.post('api/outcome/saveoutcome', { 
                outcomeModel: outcome,
            }).then(function(response) {
                // update top role
                var topCharacterRoleOutcome = Utilities.findMax(outcome.characterRoleOutcomes, 'value');
                outcome.topCharacterRole = {
                    id: topCharacterRoleOutcome.characterRoleId,
                    name: topCharacterRoleOutcome.characterRoleName,
                    summary: topCharacterRoleOutcome.characterRoleSummary,
                    imageFile: topCharacterRoleOutcome.characterRoleImageFile
                };

                var savedOutcome = response.data;
                if (imageData.imageFile) {
                    imageService.UploadImage(
                        imageData, 'api/outcome/uploadphoto/' + savedOutcome.id
                    ).then(function(savedOutcomeWithPhoto) {
                        deferred.resolve(savedOutcomeWithPhoto);
                    });
                } else {
                    deferred.resolve(response.data);
                }
            });

            return deferred.promise;
        }
        
        var removeOutcome = function(outcome) {
            return $http.post(
                'api/outcome/removeoutcome', { 
                    outcomeId: outcome.id,
                }).then(function(response) {
                    return response.data;
            });
        }
        
        var getDefaultRoleOutcomes = function() {
            return $http.get('api/outcome/defaultroleoutcomes').then(function(response) {
                return response.data;
            });
        }
        
        var linkOutcomeToAnswer = function(answer, outcome) {
            var deferred = $q.defer();
            $http.post(
                'api/outcome/linkoutcometoanswer', { 
                    answerId: answer.id, 
                    outcomeId: outcome.id 
                }).then(function(response) {
                    updatePp(outcome).then(function(points) {
                        deferred.resolve(response.data);
                    });
                });
            return deferred.promise;
        }
        
        var unlinkOutcomeFromAnswer = function(answer, outcome) {
            var deferred = $q.defer();
            $http.post(
                'api/outcome/unlinkoutcomefromanswer', { 
                    answerId: answer.id, 
                    outcomeId: outcome.id 
                }).then(function(response) {
                    updatePp(outcome).then(function(points) {
                        deferred.resolve(response.data);
                    });
                });
            return deferred.promise;
        }
        
        var updatePp = function(outcome) {
            return $http.get(`api/outcome/pointspossible/${outcome.id}`).then(function(response) {
                outcome.pointsPossible = response.data;
                return response.data;
            });
        }

        return {
            SaveOutcome: saveOutcome,
            RemoveOutcome: removeOutcome,
            GetDefaultRoleOutcomes: getDefaultRoleOutcomes,
            LinkOutcomeToAnswer: linkOutcomeToAnswer,
            UnlinkOutcomeFromAnswer: unlinkOutcomeFromAnswer,
            UpdatePp: updatePp
        };
    }
    
    // register the service
    app.factory('outcomeDataService', ['$q', '$rootScope', '$log', '$http', 'userService', 'imageService', outcomeDataService]);
    
})();