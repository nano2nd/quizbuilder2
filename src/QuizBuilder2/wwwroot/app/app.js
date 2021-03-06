(function() {

    var app = angular.module('quizBuilder', ['ui.router', 'rzModule', 'ui.tinymce']);
    
    
    /** ROUTES **/
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('login', {
                url: '/login?returnUrl',
                templateUrl: 'app/components/logIn/logIn.html',
                controller: 'LogInCtrl',
                title: 'Log In'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/components/register/register.html',
                controller: 'RegisterCtrl',
                title: 'Register'
            })
            .state('register-finish', {
                url: '/register/finish',
                templateUrl: 'app/components/register/finish.html',
                title: 'Thank you for registering',
                controller: 'RegisterCtrl'
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
                        return quizService.getQuizData($stateParams.id);
                    }]
                }
            })
            .state('quiz.questions', {
                url:'',
                templateUrl: 'app/components/question/questions.html'
            })
            .state('quiz.quick-entry', {
                url:'/quick-entry',
                templateUrl: 'app/components/question/quick-entry.html',
                controller: 'QuickEntryCtrl'
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
                    'characterRoles': ['$stateParams', 'outcomeDataService', function($stateParams, outcomeDataService) {
                        if (!$stateParams.outcomeId)
                            return outcomeDataService.GetDefaultRoleOutcomes();
                    }]
                }
            })
            .state('play', {
                url: '/play/:quizId',
                templateUrl: 'app/components/quiz-emulator/quiz-emulator.html',
                controller: 'QuizEmulatorCtrl',
                abstract: true,
                resolve: {
                    'quizEmulatorData': ['$stateParams', 'quizDataService', function($stateParams, quizDataService) {
                        return quizDataService.GetQuiz($stateParams.quizId);
                    }]
                }
            })
            .state('play.intro', {
                url: '',
                templateUrl: 'app/components/quiz-emulator/quiz-intro.html'
            })
            .state('play.finish', {
                url: '/finish',
                templateUrl: 'app/components/quiz-emulator/quiz-finish.html',
                controller: 'quizEmulatorOutcomeCtrl'
            })
            .state('play.start', {
                url: '/:questionIndex',
                templateUrl: 'app/components/quiz-emulator/play-quiz.html',
                controller: 'quizEmulatorQuestionCtrl',
                resolve: {
                    'quizQuestionData': ['$stateParams', 'quizEmulatorData', function($stateParams, quizEmulatorData) {
                        return quizEmulatorData.questions[$stateParams.questionIndex];
                    }]
                }
            })
    }
    app.config(['$stateProvider', '$urlRouterProvider', configRoutes]);    
    
    
    /** LOGGING **/
    var configLog = function($logProvider) {
        $logProvider.debugEnabled(true);
    }
    app.config(['$logProvider', configLog])
    
    
    /** APP RUN **/
    var run = function($rootScope, $state, $location, httpHelper) {
        
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            
            //record slight history; 
            $rootScope.previousState = { 
                state: fromState,
                params: fromParams
            }
            
            var user = qb_LOGGED_IN_USER;

            // These pages are OK for 
            if (toState.name == "login" || toState.name == "register") {
                if (user) {
                    e.preventDefault(); // stop current execution
                    $state.go('home');
                }
                else {
                   return; // no need to redirect
                }
            }

            // now, redirect only not authenticated
            if(!user) {
                e.preventDefault(); // stop current execution
                $state.go('login', {'returnUrl': $location.$$url}); // go to login
            }
        });
    }

    app.run(['$rootScope', '$state', '$location', 'httpHelper', run]);
    
})();