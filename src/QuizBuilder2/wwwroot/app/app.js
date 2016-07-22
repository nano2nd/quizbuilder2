(function() {

    var app = angular.module('quizBuilder', ['ui.router', 'rzModule', 'ui.tinymce']);
    
    
    /** ROUTES **/
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/logIn/logIn.html',
                controller: 'LogInCtrl',
                title: 'Log In'
            })
            .state('home', {
                url: '/?page',
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeCtrl',
                title: 'Home',
                nav: true,
                resolve: {
                    'quizData': ['$stateParams', 'homeService', function($stateParams, homeService) {
                        return homeService.data($stateParams.page);
                    }]
                }
            })
            .state('quiz', {
                url: '/quiz/:id',
                templateUrl: 'app/components/quiz/quiz.html',
                controller: 'QuizCtrl',
                abstract: true,
                resolve: {
                    'quizData': ['$stateParams', 'quizService', function($stateParams, quizService) {
                        return quizService.quizData($stateParams.id);
                    }]
                }
            })
            .state('quiz.questions', {
                url:'',
                templateUrl: 'app/components/question/questions.html'
            })
            .state('quiz.question-edit', {
                url:'/edit/:questionId',
                templateUrl: 'app/components/question/question-edit.html',
                controller: 'QuestionCtrl'
            })
            .state('quiz.question-answers', {
                url:'/:questionId',
                templateUrl: 'app/components/question/question-answers.html',
                controller: 'QuestionCtrl'
            })
            .state('quiz.answer-edit', {
                url:'/:questionId/edit/:answerId',
                templateUrl: 'app/components/answer/answer-edit.html',
                controller: 'AnswerCtrl'
            })
            .state('quiz.outcome-edit', {
                url: '/outcome/:outcomeId',
                templateUrl: 'app/components/outcome/outcome-edit.html',
                controller: 'OutcomeCtrl',
                resolve: {
                    'rolesData': ['$stateParams', 'outcomeService', function($stateParams, outcomeService) {
                        if ($stateParams.outcomeId) {
                            return outcomeService.rolesForOutcome($stateParams.outcomeId);
                        } else {
                            return outcomeService.newRolesForOutcome();
                        }
                    }]
                }
            });
    }
    app.config(['$stateProvider', '$urlRouterProvider', configRoutes]);    
    
    
    /** LOGGING **/
    var configLog = function($logProvider) {
        $logProvider.debugEnabled(true);
    }
    app.config(['$logProvider', configLog])
    
    
    /** APP RUN **/
    var run = function($rootScope, $state, userService, httpHelper) {
        
        $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            var isLogin = toState.name == "login";
            
            //record slight history; 
            $rootScope.previousState = { 
                state: fromState,
                params: fromParams
            }
            
            if(isLogin){
               return; // no need to redirect 
            }

            // now, redirect only not authenticated
            var user = userService.LoggedInUser();

            if(!user) {
                e.preventDefault(); // stop current execution
                $state.go('login'); // go to login
            }
        });
    }

    app.run(['$rootScope', '$state', 'userService', 'httpHelper', run]);
    
})();