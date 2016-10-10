(function() {
    
    var app = angular.module('quizBuilder');

    var quizDataService = function($q, $rootScope, $log, $http, userService) {
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
        
        var getQuizCount = function() {
            return $http.get('api/quiz/getquizcount').then(function(response) {
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
        var saveQuiz = function(quiz) {
            return $http.post('api/quiz/savequiz', {
                quizModel: quiz
            }).then(function(response) {
                return response.data;
            });
        }
        
        /**
         * [[Description]]
         * @param {[[Type]]} quiz [[Description]]
         */
        var removeQuiz = function(quizId) {
            return $http.post('api/quiz/removequiz', {
                quizId: quizId
            }).then(function(response) {
                return response.data;
            });
        }
                
        return {
            GetQuizzes: getQuizzes,
            GetQuizCount: getQuizCount,
            SaveQuiz: saveQuiz,
            RemoveQuiz: removeQuiz,
            GetQuiz: getQuiz
        }
    }
    
    // register the service
    app.factory('quizDataService', ['$q', '$rootScope', '$log', '$http', 'userService', quizDataService]);
    
})();