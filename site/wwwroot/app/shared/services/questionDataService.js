(function() {
    
    var app = angular.module('quizBuilder');

    var questionDataService = function($q, $rootScope, $log, $http) {

        var saveQuestion = function(question) {
            return $http.post('api/question/savequestion', {
                    questionModel: question
                }).then(function(response) {
                    return response.data;
                });


            // var deferred = $q.defer();
            // var isNew = !question.id;
            
            // // Create it if it does not exist
            // if (isNew) {
            //     question = create('Question');
            //     question.set('answers', []);
            // }
            
            // if (questionText) {
            //     question.set('questionText', questionText.trim());
            // }
            
            // if (points) {
            //     question.set('points', points);
            // }
            
            // question.save().then(function(savedQuestion) {               
            //     // Add to answers array of question
            //     if (isNew) {
            //         quiz.add('questions', savedQuestion);
            //         return quiz.save().then(function() {
            //             $rootScope.$broadcast('updatePp');
            //             deferred.resolve(savedQuestion);  
            //         });                   
            //     } else {
            //         $rootScope.$broadcast('updatePp');
            //         deferred.resolve(savedQuestion); 
            //     }
            // }, function(error) {
            //     $log.error(error.message);
            //     deferred.reject(error);
            // });
            
            //return deferred.promise;
        }

        var removeQuestion = function(question) {
            return $http.post('api/question/removequestion', {
                questionId: question.id
            }).then(function(response) {
                return response.data;
            });
        }

        var updatePoints = function(question, points) {
            return $http.post('api/question/updatepoints', {
                questionId: question.id,
                points: points
            }).then(function(response) {
                question.answers.forEach(function(a) {
                    a.outcomes.forEach(function(o) {
                        $rootScope.$broadcast('updatePp', o);
                    });
                });
                return response.data;
            });
        }

        var saveFromQuickEntry = function(questions) {
            return $http.post('api/question/saveFromQuickEntry', {
                questions: questions
            }).then(function(response) {
                return response.data;
            });
        }
                
        return {
            UpdatePoints: updatePoints,
            SaveQuestion: saveQuestion,
            RemoveQuestion: removeQuestion,
            SaveFromQuickEntry: saveFromQuickEntry
        }
    }
    
    // register the service
    app.factory('questionDataService', ['$q', '$rootScope', '$log', '$http', questionDataService]);
    
})();