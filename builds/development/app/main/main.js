/**
 * Created by jura- on 26.09.2016.
 */
angular.module('Calendar.main', ['ui.router'])
    .controller('MainCtrl', MainCtrl)
MainCtrl.$inject = ['$scope', '$rootScope'];
function MainCtrl($scope, $rootScope) {
    var home = this;
     home.day = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"];
    /*Масив*/
}