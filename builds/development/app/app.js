/**
 * Created by jura- on 26.09.2016.
 */
$.material.init();
angular.module("Calendar",[
    'ui.router',
    'firebase',
    'Calendar.fitfire.service',
    'Calendar.main',
    'Calendar.admin'
])
    .config(Config)
    .constant('FIREBASE_URL','https://schedule-efa82.firebaseio.com/');
Config.$inject = ["$stateProvider", "$urlRouterProvider"];

function Config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'app/admin/admin.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin'
        })
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'home'
        })

};
