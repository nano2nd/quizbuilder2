(function() {
    
    var app = angular.module('quizBuilder');

    var outcomeDataService = function($q, $rootScope, $log, $http, userService) {
        
        var saveOutcome = function(outcome) {
            return $http.post(
                'api/outcome/saveoutcome', { 
                    outcomeModel: outcome,
                }).then(function(response) {
                    return response.data;
            });

            // var deferred = $q.defer();
            // var isNew = !outcome.id;
            
            // // Create it if it does not exist
            // if (isNew) {
            //     outcome = create('Outcome');
            //     outcome.points = 0;
            // }
            
            // outcome.set('name', name.trim());
            // outcome.set('image', image);
            // outcome.set('summary', summary.trim());
            
            // outcome.save().then(function(savedOutcome) {
            //     // Add to outcomes array for quiz
            //     if (isNew) {                    
            //         quiz.add('outcomes', savedOutcome);
            //         quiz.save().then(function() {
            //             $rootScope.$broadcast('updatePp');
            //         });
            //     }
                                            
            //     // Update all outcome roles or create new ones if needed
            //     var outcomeToRoles = [];
            //     var topOutcomeToRole;
            //     outcomeRoles.forEach(function(outcomeRole) {
            //         if (isNew) {
            //             // Connect OutcomeToRole to new Outcome
            //             var outcomeToRole = create('OutcomeToRole');
            //             outcomeToRole.set('outcome', savedOutcome);
            //             outcomeToRole.set('role', outcomeRole.role);
            //             outcomeToRole.set('value', outcomeRole.value);
            //             outcomeToRoles.push(outcomeToRole);
            //         } else {
            //             outcomeRole.set('value', outcomeRole.value);
            //             outcomeToRoles.push(outcomeRole);
            //         }
                    
            //         //keep track of the highest value
            //         if (!topOutcomeToRole) {
            //             topOutcomeToRole = outcomeRole;
            //         } else {
            //             if (outcomeRole.value > topOutcomeToRole.value) {
            //                 topOutcomeToRole = outcomeRole;
            //             }
            //         }
            //     });
            //     outcome.topRole = topOutcomeToRole.role;
            //     // Save the role values
            //     return Parse.Object.saveAll(outcomeToRoles).then(function(savedOutcomeToRoles) {
            //         deferred.resolve(savedOutcome);
            //     });
            // }, function(error) {
            //     $log.error(error.message);
            //     deferred.reject(error);
            // });
            
            // return deferred.promise;
        }
        
        var removeOutcome = function(outcome) {
            return $http.post(
                'api/outcome/removeoutcome', { 
                    outcomeId: outcome.id,
                }).then(function(response) {
                    return response.data;
            });
            // var deferred = $q.defer();
            // quiz.remove('outcomes', outcome);
            
            // quiz.save().then(function() {
            //     $rootScope.$broadcast('updatePp');
            //     // Remove all roles for Outcome
            //     return removeRolesForOutcome(outcome).then(function() {
            //         // Remove links to answers
            //         var answerQuery = query('Answer');
            //         answerQuery.equalTo('outcomes', outcome);
            //         var unlinkPromises = [];
            //         answerQuery.each(function(answerWithOutcome) {
            //             unlinkPromises.push(unlinkOutcomeForAnswer(answerWithOutcome, outcome));
            //         }).then(function() {
            //             $q.all(unlinkPromises).then(function() {
            //                 return outcome.destroy().then(function(savedOutcome) {  
            //                     deferred.resolve(savedOutcome);        
            //                 });
            //             });
            //         });
            //     });
            // }, function(error) {
            //     $log.error(error.message); 
            //     deferred.reject(error); 
            // });
            
            // return deferred.promise;
        }
        
        var getDefaultRoleOutcomes = function() {
            return $http.get('api/outcome/defaultroleoutcomes').then(function(response) {
                return response.data;
            });
            // var rolesQuery = query('Role');
            // rolesQuery.ascending('name');
            // return rolesQuery.find().then(function(roles) {
            //     var initalRoleValue = Math.floor(100 / roles.length);
            //     var outcomeToRoles = [];
            //     roles.forEach(function(role) {
            //         var outcomeToRole = {
            //             role: role,
            //             value: initalRoleValue
            //         }
            //         outcomeToRoles.push(outcomeToRole);
            //     });
                
            //     return outcomeToRoles;
            // });
        }
        
        //var getRolesForOutcome = function(outcome) {
            // var deferred = $q.defer();
            // if (!(outcome && outcome.id)) {
            //     getInitialOutcomeToRoles().then(function(outcomeToRoles) {
            //         deferred.resolve(outcomeToRoles);
            //     });
            // } else {
            //     var outcomeToRoleQuery = query('OutcomeToRole');
            //     outcomeToRoleQuery.equalTo('outcome', outcome);
            //     outcomeToRoleQuery.find().then(function(outcomeToRoles) {
            //         deferred.resolve(outcomeToRoles); 
            //     });
            // }
            
            // return deferred.promise;
        //}
        
        // var removeRolesForOutcome = function(outcome) {
        //     var deferred = $q.defer();
        //     if (!outcome.id) {
        //         return;
        //     }
        //     var outcomeToRolesQuery = query('OutcomeToRole');
        //     outcomeToRolesQuery.equalTo('outcome', outcome);
            
        //     var outcomeToRolesPromises = [];
        //     outcomeToRolesQuery.each(function(outcomeToRole) {
        //         outcomeToRolesPromises.push(outcomeToRole.destroy());
        //     });
            
        //     $q.all(outcomeToRolesPromises).then(function(removedRoles) {
        //         deferred.resolve(removedRoles);
        //     }, function(error) {
        //         $log.error(error.message);
        //     });
            
        //     return deferred.promise;
        // }
        
        var linkOutcomeToAnswer = function(answer, outcome) {
            var deferred = $q.defer();
            $http.post(
                'api/outcome/linkoutcometoanswer', { 
                    answerId: answer.id, 
                    outcomeId: outcome.id 
                }).then(function(response) {
                    updatePp(outcome).then(function(points) {
                        outcome.pointsPossible = points;
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
                        outcome.pointsPossible = points;
                        deferred.resolve(response.data);
                    });
                });
            return deferred.promise;
        }
        
        /**
         * Returns the amount of points possible for a given outcome.
         * @param {object} outcome The amount of points possble
         * @returns {Promise} Promise that return an integer of points possible
         */
        // var getPointsPossibleForOutcome = function(outcome) {
        //     var deferred = $q.defer();
        //     var answerQuery = query('Answer');
        //     answerQuery.include('outcomes');
        //     answerQuery.equalTo('outcomes', outcome);
            
        //     var questionQuery = query('Question');
        //     questionQuery.matchesQuery('answers', answerQuery);
            
        //     questionQuery.find().then(function(questions) {
        //         if (!questions.length) {
        //             deferred.resolve(0);
        //         } else {
        //             var pointsPossible = questions.map(function(question) {
        //                 return question.get('points');
        //             }).reduce(function(nextPoints, currentPoints) {
        //                 return nextPoints + currentPoints;
        //             });
        //             deferred.resolve(pointsPossible);
        //         }
        //     }, function(error) {
        //         $log.error(error.message);
        //         deferred.reject(error);
        //     });
            
        //     return deferred.promise;
        // }
        
        var updatePp = function(outcome) {
            return $http.get(`api/outcome/pointspossible/${outcome.id}`).then(function(response) {
                return response.data;
            });
            // var deferred = $q.defer();
            // var outcomePointsPromises = [];
            // quiz.get('outcomes').forEach(function(outcome) {
            //     outcomePromise = getPointsPossibleForOutcome(outcome).then(function(points) {
            //         outcome.pointsPossible = points;
            //     });
            //     outcomePointsPromises.push(outcomePromise);
            // });
            
            // $q.all(outcomePointsPromises).then(function(result) {
            //     deferred.resolve(result);
            // }, function(error) {
            //     $log.error(error.message);
            //     deferred.reject(error);
            // });
            
            // return deferred.promise;
        }
        
        // /**
        //  * Returns the role with the highest value for an Outcome
        //  * @param   {Object} outcome The Outcome object to find
        //  * @returns {Object} Promise containing Outcome object
        //  */
        // var topRoleForOutcome = function(outcome) {
        //     var deferred = $q.defer();
        //     var roleQuery = query('OutcomeToRole');
        //     roleQuery.include('role');
        //     roleQuery.equalTo('outcome', outcome);
        //     roleQuery.descending('value');
        //     roleQuery.first().then(function(outcomeToRole) {
        //         deferred.resolve(outcomeToRole.get('role'));
        //     }, function(error) {
        //         $log.error(error.message);
        //         deferred.reject(error);
        //     });
        //     return deferred.promise;
        // }

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
    app.factory('outcomeDataService', ['$q', '$rootScope', '$log', '$http', 'userService', outcomeDataService]);
    
})();