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

/**
 * Created by jura- on 13.10.2016.
 */
;(function () {
    'use strict';
    angular
        .module('Calendar.fitfire.service', ['firebase'])
        .service('fitfire', fitfire);
    fitfire.$inject = ['$log', 'FIREBASE_URL', '$firebaseObject', '$firebaseArray'];
    function fitfire($log, FIREBASE_URL, $firebaseObject, $firebaseArray) {
        var self = this;
        var ref = new Firebase(FIREBASE_URL);
        var mainRef = ref.child('main'),
            lessonRef = ref.child('lesson'),
            lessonArr = $firebaseArray(ref.child('lesson')),
            GroupArr = $firebaseArray(ref.child('group')),
            TeachersArr = $firebaseArray(ref.child('teachers')),
            NumberOfPairArr = $firebaseArray(ref.child('NumberofPair')),
            facultyArr = $firebaseArray(ref.child('faculty')),
            lessonArr =$firebaseArray(ref.child('lesson')),
            specialityArr = $firebaseArray(ref.child('specialty')),
            mainArr = $firebaseArray(mainRef);
        // Main
        this.getMain = function (cb) {
            return mainArr.$loaded(cb);
        };
        // Lesson
        // getlesson
        this.getLesson = function (cb) {
            return lessonArr.$loaded(cb);
        };
        // add Lesson
        this.addLesson = function (_lesson, _cb) {
            var lessonLength = $firebaseObject(ref.child('id_count').child('lesson'));
            lessonLength.$loaded(function () {
                var LLength = ++lessonLength.$value;
                lessonLength.$save();
                lessonRef.child(LLength).set(_lesson, _cb);
            });
        };
        // Update lesson
        this.updateLesson = function (_lesson) {
            return lessonArr.$save(_lesson);
        };
        // Set Lesson
        this.SetDusc = function (_id) {
            return lessonArr.$getRecord(_id);

        }
        // Delete Lesson
        this.RemoveLesson = function (_lesson) {
            return lessonArr.$remove(_lesson);
        };
        // Group
        this.getGroup = function (cb) {
            return GroupArr.$loaded(cb);
        };
        // Teacher
        this.getTeachers = function (cb) {
            return TeachersArr.$loaded(cb);
        };
        // NumberOfPair
        this.getNumberofPair = function (cb) {
            return NumberOfPairArr.$loaded(cb);
        };
        // Facult
        this.getFacult = function (cb) {
            return facultyArr.$loaded(cb);
        };
        // Specialnist
        this.getSpeciality = function (cb) {
            return specialityArr.$loaded(cb);
        };



        // this.addUser = function (_user, _cb) {
        //     var usersLength = $firebaseObject(ref.child('option').child('usersLength'));
        //     usersLength.$loaded(function () {
        //         var uLength = ++usersLength.$value;
        //         usersLength.$save();
        //         usersRef.child(uLength).set(_user, _cb);
        //     });
        //
        // }
        // refObj.$loaded(function () {
        //     self.db = refObj;
        // });
        // var refArr = $firebaseArray(ref);
        // refArr.$loaded(function () {
        //     self.dbArr = refArr;
        // })
    }
})()
/**
 * Created by jura- on 17.10.2016.
 */
/**
 * Created by jura- on 26.09.2016.
 */
angular.module('Calendar.admin', ['ui.router'])
    .controller('AdminCtrl', AdminCtrl)
AdminCtrl.$inject = ['$scope', '$rootScope', '$log', 'FIREBASE_URL', 'fitfire'];
function AdminCtrl($scope, $rootScope, $log, FIREBASE_URL, fitfire) {
    var admin = this;
    // admin lesson
    admin.addLesson = {
        name: ""
    }
    admin.correctDusc = "";
    admin.duscUpdate = {};
    fitfire.getLesson(function (_d) {
        admin.lesson = _d;
    });
    admin.SetAddLesson = function () {
        admin.addLesson = {
            name: ""
        };
        admin.correctDusc = 'Введіть назву дисципліни';
    };
    admin.addless = function () {
        if (admin.addLesson.name != "") {
            fitfire.addLesson(admin.addLesson, function () {
                admin.addLesson = {
                    name: ""
                };
                alert("Дисципліну додано");
            });

        }
        else {
            alert("Введіть назву дисципліни");
        }
    };
    admin.SetEditDusc = function (_lesson) {
        admin.correctDusc = 'Відредагуйте дисципліну';
        admin.addLesson = fitfire.SetDusc(_lesson.$id);
    };
    admin.UpdateDusc = function (_lesson) {
        fitfire.updateLesson(_lesson).then(function () {
            alert("Запис відредаговано");
            admin.addLesson = {name: ""};
        })
    };
    admin.RemoveDusc = function (_id) {
        $log.debug(_id);
        admin.result = confirm("Ви хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
            $log.debug(admin.addLesson);
            fitfire.RemoveLesson(fitfire.SetDusc(_id)).then(function () {
                alert("Запис видалено");
                admin.lessonFilter = "";
                admin.addLesson = {};
            })
        }
    }
    // end lesson
    admin.lessonFilter = "";
    admin.specialityFilter = "";

    fitfire.getMain(function (_d) {
        admin.main = _d;
    });

    fitfire.getGroup(function (_d) {
        admin.group = _d;
    });
    fitfire.getTeachers(function (_d) {
        admin.teacher = _d;
    });
    fitfire.getNumberofPair(function (_d) {
        admin.NumberofPair = _d;
    });
    fitfire.getFacult(function (_d) {
        admin.facultet = _d;
    });
    fitfire.getLesson(function (_d) {
        admin.lesson = _d;
    });
    fitfire.getSpeciality(function (_d) {
        admin.speciality = _d;
    });


}
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