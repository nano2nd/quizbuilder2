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

        var updatePoints = function(questionId, points) {
                return $http.post('api/question/updatepoints', {
                    questionId: questionId,
                    points: points
                }).then(function(response) {
                    return response.data;
                });
        }

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
                
        return {
            UpdatePoints: updatePoints,
            SaveQuestion: saveQuestion
        }
    }
    
    // register the service
    app.factory('questionDataService', ['$q', '$rootScope', '$log', '$http', questionDataService]);
    
})();