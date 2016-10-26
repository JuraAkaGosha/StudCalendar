/**
 * Created by jura- on 26.09.2016.
 */
angular.module('Calendar.main', ['ui.router'])
    .controller('MainCtrl', MainCtrl)
MainCtrl.$inject = ['$scope', '$rootScope','$log', 'FIREBASE_URL', 'fitfire'];
function MainCtrl($scope, $rootScope,$log, FIREBASE_URL, fitfire) {
    var home = this;
    home.massday = [
        {id:1,
            name:"Понеділок"},
        {id:2,
            name:"Вівторок"},
        {id:3,name:"Середа"},
        {id:4,name:"Четвер"},
        {id:5, name:"П'ятниця"}];
    // home.day = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота","Неділя"];
    home.now = moment(0);
   fitfire.getMain(function (_d) {
       home.main = _d;
   });
    fitfire.getLesson(function (_d) {
        home.lesson = _d;
    });
    fitfire.getGroup(function (_d) {
        home.group = _d;
    });
    fitfire.getTeachers(function (_d) {
        home.teacher = _d;
    });
    fitfire.getNumberofPair(function (_d) {
        home.NumberofPair = _d;
    });
    $scope.lol = function (){
        $scope.days = this.subg.para;
    }

}