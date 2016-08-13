(function() {
    
    var app = angular.module('quizBuilder');

    var dataService = function($q, $rootScope, $log, $http, userService) {
                
        /**
         * [[Description]]
         * @param   {[[Type]]} className [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var create = function(className) {
            var ClassObject = Parse.Object.extend(className);
            return new ClassObject();
        }
        
        /**
         * Shorthand to create Parse's database Query object.
         * @param {string} className - The name of the Class in Parse.
         * @returns {Parse.Query} - The Query object
         */
        var query = function(className) {
            var classObject = create(className);
            return new Parse.Query(classObject);
        }
        
        /**
         * Gets the quizzes from the parse database.
         * @param {int} limit - The maximum number of results
         * @param {int} skip - The amount of results to skip (for paging)
         * @return {promise} - A promise that returns when the query has finished
         */
        var getQuizzes = function(limit = null, skip = null) {
            return $http.get(`api/quiz/quizzes?limit=${limit}&skip=${skip}`).then(function(response) {
                return response.data;
            });
        }
        
        /**
         * The amount of quizzes in the Parse database.
         * @return {promise} - A promise that returns when the query has finished
         */
        var getQuizCount = function() {
            return $http.get(`api/quiz/count`).then(function(response) {
                return response.data;
            });
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} id [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var getQuiz = function(id) {
            return $http.get(`api/quiz/getquiz/${id}`).then(function(response) {
                return response.data;
            });

            // var deferred = $q.defer();
            // var q = query('Quiz');
            // q.equalTo('objectId', id);
            // q.include('questions');
            // q.include('questions.answers');
            // q.include('questions.answers.image');
            // q.include('outcomes');
            // q.first().then(function(quiz) {
            //     // Calculate points possible for each outcome
            //     var updatePpPromise = updateAllOutcomePp(quiz);
                
            //     // Get top role for each outcome
            //     var topPointsPromises = [];
            //     quiz.get('outcomes').forEach(function(outcome) {
            //         topPointsPromises.push(topRoleForOutcome(outcome).then(function(role) {
            //             outcome.topRole = role;
            //             return role;
            //         }));
            //     });
                
            //     return $q.all([updatePpPromise, $q.all(topPointsPromises)]).then(function() {
            //         deferred.resolve(quiz);
            //     });

            // }, function(error) {
            //    $log.error(error.message); 
            // });
            
            // return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {Object}   quiz  [[Description]]
         * @param   {[[Type]]} title [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var saveQuiz = function(quiz, title) {
            var deferred = $q.defer();
            var isNew = !quiz.id;
            
            // Create it if it does not exist
            if (isNew) {
                quiz = create('Quiz');
                quiz.set('questions', []);
                quiz.set('outcomes', []);
                quiz.set('user', userService.LoggedInUser());
            }
            
            if (title) {
                quiz.set('title', title.trim());
            }
            
            quiz.save().then(function(savedQuiz) {
                deferred.resolve(savedQuiz); 
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param {[[Type]]} quiz [[Description]]
         */
        var removeQuiz = function(quiz) {
            var deferred = $q.defer();
            var questionPromises = [];
            quiz.get('questions').forEach(function(question) {
               questionPromises.push(removeQuestion(question, quiz)); 
            });
            $q.all(questionPromises).then(function() {
                var outcomePromises = [];
                quiz.get('outcomes').forEach(function(outcome) {
                    outcomePromises.push(removeOutcome(outcome, quiz)); 
                });
                $q.all(outcomePromises).then(function() {
                    return quiz.destroy().then(function(quiz) {
                       deferred.resolve(quiz);
                    });
                });
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} id [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var getQuestion = function(id) {
            var deferred = $q.defer();
            var q = query('Question');
            q.equalTo('objectId', id);
            q.include('answers');
            q.include('answers.outcomes');
            q.first().then(function(question) {
                deferred.resolve(question);
            }, function(error) {
               $log.error(error.message); 
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {Object}   question     [[Description]]
         * @param   {[[Type]]} questionText [[Description]]
         * @param   {[[Type]]} quiz         [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var saveQuestion = function(question, questionText, points, quiz) {
            var deferred = $q.defer();
            var isNew = !question.id;
            
            // Create it if it does not exist
            if (isNew) {
                question = create('Question');
                question.set('answers', []);
            }
            
            if (questionText) {
                question.set('questionText', questionText.trim());
            }
            
            if (points) {
                question.set('points', points);
            }
            
            question.save().then(function(savedQuestion) {               
                // Add to answers array of question
                if (isNew) {
                    quiz.add('questions', savedQuestion);
                    return quiz.save().then(function() {
                        $rootScope.$broadcast('updatePp');
                        deferred.resolve(savedQuestion);  
                    });                   
                } else {
                    $rootScope.$broadcast('updatePp');
                    deferred.resolve(savedQuestion); 
                }
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} question [[Description]]
         * @param   {[[Type]]} quiz     [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var removeQuestion = function(question, quiz) {
            var deferred = $q.defer();
            quiz.remove('questions', question);
            quiz.save().then(function() {
                var answers = question.get('answers');
                var answerPromises = [];
                answers.forEach(function(answer) {
                     answerPromises.push(removeAnswer(answer, question));
                });
                return $q.all(answerPromises).then(function() {
                    return question.destroy().then(function(question) {
                        deferred.resolve(question);
                    });
                });
                
            }, function(error) {
                $log.error(error.message); 
                deferred.reject(error); 
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {Object}   answer        [[Description]]
         * @param   {[[Type]]} answerText    [[Description]]
         * @param   {[[Type]]} image         [[Description]]
         * @param   {[[Type]]} showImageOnly [[Description]]
         * @param   {[[Type]]} question      [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var saveAnswer = function(answer, answerText, image, showImageOnly, question) {
            var deferred = $q.defer();
            var isNew = !answer.id;
            
            // Create it if it does not exist
            if (isNew) {
                answer = create('Answer');
            }
            
            answer.set('answerText', answerText.trim());
            answer.set('showImageOnly', showImageOnly);
            
            var imagePromises = [];
            if (image) {
                var parseFile = new Parse.File(image.name, image);
                imagePromises.push(parseFile.save().then(function() {
                    var parseImage = create('Image');
                    parseImage.set('data', parseFile);
                    return parseImage.save().then(function() {
                         answer.set('image', parseImage); 
                    });
                }));  
            }
            
            $q.all(imagePromises).then(function() {
                return answer.save().then(function(savedAnswer) {
                    // Add to answers array of question
                    if (isNew) {
                        question.add('answers', savedAnswer);
                        return question.save().then(function() {
                            deferred.resolve(savedAnswer);
                        });
                    } else {
                        deferred.resolve(savedAnswer);                  
                    } 
                });    
            }, function(error) {
                $log.error(error.message);
            });
            
            return deferred.promise;
        }
        
        /**
         * Removes an answer from the database
         * @param   {Obj} answer The object of the Answer
         * @returns {Object} A promise that contains the removed Answer
         */
        var removeAnswer = function(answer, question) {
            var deferred = $q.defer();
            var preDestroyPromises = [];
            question.remove('answers', answer);
            preDestroyPromises.push(question.save());
            
            var image = answer.get('image');
            preDestroyPromises.push(image.destroy());
            
            $q.all(preDestroyPromises).then(function() {
                return answer.destroy().then(function(answer) {
                    $rootScope.$broadcast('updatePp');
                    deferred.resolve(answer);
                });
            }, function(error) {
                $log.error(error.message); 
                deferred.reject(error); 
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {Object}   answer        [[Description]]
         * @param   {[[Type]]} answerText    [[Description]]
         * @param   {[[Type]]} image         [[Description]]
         * @param   {[[Type]]} showImageOnly [[Description]]
         * @param   {[[Type]]} question      [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var saveOutcome = function(outcome, name, summary, image, outcomeRoles, quiz) {
            var deferred = $q.defer();
            var isNew = !outcome.id;
            
            // Create it if it does not exist
            if (isNew) {
                outcome = create('Outcome');
                outcome.points = 0;
            }
            
            outcome.set('name', name.trim());
            outcome.set('image', image);
            outcome.set('summary', summary.trim());
            
            outcome.save().then(function(savedOutcome) {
                // Add to outcomes array for quiz
                if (isNew) {                    
                    quiz.add('outcomes', savedOutcome);
                    quiz.save().then(function() {
                        $rootScope.$broadcast('updatePp');
                    });
                }
                                            
                // Update all outcome roles or create new ones if needed
                var outcomeToRoles = [];
                var topOutcomeToRole;
                outcomeRoles.forEach(function(outcomeRole) {
                    if (isNew) {
                        // Connect OutcomeToRole to new Outcome
                        var outcomeToRole = create('OutcomeToRole');
                        outcomeToRole.set('outcome', savedOutcome);
                        outcomeToRole.set('role', outcomeRole.role);
                        outcomeToRole.set('value', outcomeRole.value);
                        outcomeToRoles.push(outcomeToRole);
                    } else {
                        outcomeRole.set('value', outcomeRole.value);
                        outcomeToRoles.push(outcomeRole);
                    }
                    
                    //keep track of the highest value
                    if (!topOutcomeToRole) {
                        topOutcomeToRole = outcomeRole;
                    } else {
                        if (outcomeRole.value > topOutcomeToRole.value) {
                            topOutcomeToRole = outcomeRole;
                        }
                    }
                });
                outcome.topRole = topOutcomeToRole.role;
                // Save the role values
                return Parse.Object.saveAll(outcomeToRoles).then(function(savedOutcomeToRoles) {
                    deferred.resolve(savedOutcome);
                });
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} outcome [[Description]]
         * @param   {[[Type]]} quiz    [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var removeOutcome = function(outcome, quiz) {
            var deferred = $q.defer();
            quiz.remove('outcomes', outcome);
            
            quiz.save().then(function() {
                $rootScope.$broadcast('updatePp');
                // Remove all roles for Outcome
                return removeRolesForOutcome(outcome).then(function() {
                    // Remove links to answers
                    var answerQuery = query('Answer');
                    answerQuery.equalTo('outcomes', outcome);
                    var unlinkPromises = [];
                    answerQuery.each(function(answerWithOutcome) {
                        unlinkPromises.push(unlinkOutcomeForAnswer(answerWithOutcome, outcome));
                    }).then(function() {
                        $q.all(unlinkPromises).then(function() {
                            return outcome.destroy().then(function(savedOutcome) {  
                                deferred.resolve(savedOutcome);        
                            });
                        });
                    });
                });
            }, function(error) {
                $log.error(error.message); 
                deferred.reject(error); 
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var getInitialOutcomeToRoles = function() {
            var rolesQuery = query('Role');
            rolesQuery.ascending('name');
            return rolesQuery.find().then(function(roles) {
                var initalRoleValue = Math.floor(100 / roles.length);
                var outcomeToRoles = [];
                roles.forEach(function(role) {
                    var outcomeToRole = {
                        role: role,
                        value: initalRoleValue
                    }
                    outcomeToRoles.push(outcomeToRole);
                });
                
                return outcomeToRoles;
            });
        }
        
        /**
         * [[Description]]
         * @param   {Object}   outcome [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var getRolesForOutcome = function(outcome) {
            var deferred = $q.defer();
            if (!(outcome && outcome.id)) {
                getInitialOutcomeToRoles().then(function(outcomeToRoles) {
                    deferred.resolve(outcomeToRoles);
                });
            } else {
                var outcomeToRoleQuery = query('OutcomeToRole');
                outcomeToRoleQuery.equalTo('outcome', outcome);
                outcomeToRoleQuery.find().then(function(outcomeToRoles) {
                    deferred.resolve(outcomeToRoles); 
                });
            }
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {Object}   outcome [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var removeRolesForOutcome = function(outcome) {
            var deferred = $q.defer();
            if (!outcome.id) {
                return;
            }
            var outcomeToRolesQuery = query('OutcomeToRole');
            outcomeToRolesQuery.equalTo('outcome', outcome);
            
            var outcomeToRolesPromises = [];
            outcomeToRolesQuery.each(function(outcomeToRole) {
                outcomeToRolesPromises.push(outcomeToRole.destroy());
            });
            
            $q.all(outcomeToRolesPromises).then(function(removedRoles) {
                deferred.resolve(removedRoles);
            }, function(error) {
                $log.error(error.message);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} answer  [[Description]]
         * @param   {[[Type]]} outcome [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var linkOutcomeForAnswer = function(answer, outcome) {
            var deferred = $q.defer();
            answer.add('outcomes', outcome)
            answer.save().then(function(savedAnswer) {
                $rootScope.$broadcast('updatePp', outcome);
                deferred.resolve(savedAnswer);
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} answer  [[Description]]
         * @param   {[[Type]]} outcome [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var unlinkOutcomeForAnswer = function(answer, outcome) {
            var deferred = $q.defer();
            answer.remove('outcomes', outcome);
            answer.save().then(function(savedAnswer) {
                $rootScope.$broadcast('updatePp', outcome);
                deferred.resolve(savedAnswer);
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * Returns the amount of points possible for a given outcome.
         * @param {object} outcome The amount of points possble
         * @returns {Promise} Promise that return an integer of points possible
         */
        var getPointsPossibleForOutcome = function(outcome) {
            var deferred = $q.defer();
            var answerQuery = query('Answer');
            answerQuery.include('outcomes');
            answerQuery.equalTo('outcomes', outcome);
            
            var questionQuery = query('Question');
            questionQuery.matchesQuery('answers', answerQuery);
            
            questionQuery.find().then(function(questions) {
                if (!questions.length) {
                    deferred.resolve(0);
                } else {
                    var pointsPossible = questions.map(function(question) {
                        return question.get('points');
                    }).reduce(function(nextPoints, currentPoints) {
                        return nextPoints + currentPoints;
                    });
                    deferred.resolve(pointsPossible);
                }
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} quiz [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        var updateAllOutcomePp = function(quiz) {
            var deferred = $q.defer();
            var outcomePointsPromises = [];
            quiz.get('outcomes').forEach(function(outcome) {
                outcomePromise = getPointsPossibleForOutcome(outcome).then(function(points) {
                    outcome.pointsPossible = points;
                });
                outcomePointsPromises.push(outcomePromise);
            });
            
            $q.all(outcomePointsPromises).then(function(result) {
                deferred.resolve(result);
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            
            return deferred.promise;
        }
        
        /**
         * Returns the role with the highest value for an Outcome
         * @param   {Object} outcome The Outcome object to find
         * @returns {Object} Promise containing Outcome object
         */
        var topRoleForOutcome = function(outcome) {
            var deferred = $q.defer();
            var roleQuery = query('OutcomeToRole');
            roleQuery.include('role');
            roleQuery.equalTo('outcome', outcome);
            roleQuery.descending('value');
            roleQuery.first().then(function(outcomeToRole) {
                deferred.resolve(outcomeToRole.get('role'));
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            return deferred.promise;
        }
        
        /**
         * [[Description]]
         * @param   {[[Type]]} imageFile [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
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
        
        var removeImageFromAnswer = function(answer) {
            var deferred = $q.defer();
            
            answer.get('image').destroy().then(function(removedAnswer) {
                answer.set('image', null);
                return answer.save().then(function() {
                    deferred.resolve(removedAnswer); 
                });
            }, function(error) {
                $log.error(error.message);
                deferred.reject(error);
            });
            return deferred.promise;
        }
        
        return {
            Create: create,
            Query: query,
            GetQuizzes: getQuizzes,
            GetQuizCount: getQuizCount,
            SaveQuiz: saveQuiz,
            GetQuiz: getQuiz,
            RemoveQuiz: removeQuiz,
            SaveQuestion: saveQuestion,
            RemoveQuestion: removeQuestion,
            SaveAnswer: saveAnswer,
            RemoveAnswer: removeAnswer,
            SaveOutcome: saveOutcome,
            RemoveOutcome: removeOutcome,
            GetRolesForOutcome: getRolesForOutcome,
            LinkOutcomeForAnswer: linkOutcomeForAnswer,
            UnlinkOutcomeForAnswer: unlinkOutcomeForAnswer,
            GetPointsPossibleForOutcome: getPointsPossibleForOutcome,
            UpdateAllOutcomePp: updateAllOutcomePp,
            TopRoleForOutcome: topRoleForOutcome,
            UrlForImageFile: urlForImageFile,
            RemoveImageFromAnswer: removeImageFromAnswer
        }
    }
    
    // register the service
    app.factory('dataService', ['$q', '$rootScope', '$log', '$http', 'userService', dataService]);
    
})();