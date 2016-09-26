/**
 * Created by jura- on 26.09.2016.
 */
angular.module("Calendar",[
    'ui.router',
    'ui.calendar',
    'Calendar.main',
])
    .config(Config)

Config.$inject = ["$stateProvider", "$urlRouterProvider"];

function Config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'home'
        });
};
