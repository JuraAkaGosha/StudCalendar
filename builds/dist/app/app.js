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
            facultyRef = ref.child('faculty'),
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
        // add Facult
        this.addFacult = function (_facult, _cb) {
            var FacultLength = $firebaseObject(ref.child('id_count').child('facult'));
            FacultLength.$loaded(function () {
                var FLength = ++FacultLength.$value;
                FacultLength.$save();
                facultyRef.child(FLength).set(_facult, _cb);
            });
        };
        // Set Facult
        this.SetFacultet = function (_id) {
            return facultyArr.$getRecord(_id);
        }
        // Update facult
        this.updateFacult = function (_facult) {
            return facultyArr.$save(_facult);
        };
        this.RemoveFacult = function (_facult) {
            return facultyArr.$remove(_facult);
        };
        // Specialnist
        this.getSpeciality = function (cb) {
            return specialityArr.$loaded(cb);
        };
        // Specialnist. add specialnist
        this.addSpeciality = function (_specialnist, _cb) {
            var SpecLength = $firebaseObject(ref.child('id_count').child('speciality'));
            SpecLength.$loaded(function () {
                var SLength = ++SpecLength.$value;
                SpecLength.$save();
                ref.child('specialty').child(SLength).set(_specialnist, _cb);
            });
        };
        // Set specialnist
        this.SetSpecialnist = function (_id) {
            return specialityArr.$getRecord(_id);
        };
        this.updateSpec = function (_spec) {
            return specialityArr.$save(_spec);
        };
        this.RemoveSpec = function (_spec) {
            return specialityArr.$remove(_spec);
        };
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
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
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
    // Факультет
    fitfire.getFacult(function (_d) {
        admin.facultet = _d;
    });
    admin.setAddFacultet = function () {
        admin.addFacult = {
            name: ""
        };
        admin.correctFacult = 'Введіть назву факультету';
    };
    admin.addFacultet = function () {
        if (admin.addFacult.name != "") {
            fitfire.addFacult(admin.addFacult, function () {
                admin.setAddFacultet();
                admin.facultFilter = "";
                alert("Факультет додано");
            });
        }
        else {
            alert("Введіть назву факультету");
        }
    };
    admin.SetEditFacultet = function (_facult) {
        admin.correctFacult = 'Відредагуйте факультет';
        admin.addFacult = fitfire.SetFacultet(_facult.$id);
    };
    admin.UpdateFacult = function (_facult) {
        fitfire.updateFacult(_facult).then(function () {
            alert("Запис відредаговано");
            admin.setAddFacultet();
        })
    };
    admin.RemoveFacult = function (_id) {
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
            fitfire.RemoveFacult(fitfire.SetFacultet(_id)).then(function () {
                alert("Запис видалено");
                admin.setAddFacultet();
                admin.facultFilter="";
            })
        }
    }
    //end Факультет
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

    fitfire.getLesson(function (_d) {
        admin.lesson = _d;
    });
    // Speciality
    fitfire.getSpeciality(function (_d) {
        admin.speciality = _d;
    });
    admin.addSpec = {
        name: "",
        id_faculty: null
    };
    admin.setAddSpecality = function () {
        admin.addSpec = {
            name: "",
            id_faculty: null
        };

        admin.correctSpeciality = 'Введіть назву спеціальності';
    };
    admin.addSpeciality = function () {
        admin.sendSpec={};
        admin.sendSpec = {
            name: admin.addSpec.name,
            id_faculty: parseInt(admin.addSpec.id_faculty)
        }
        if (admin.addSpec.name != ""&& admin.addSpec.id_faculty!=null) {
            fitfire.addSpeciality(admin.sendSpec, function () {
                admin.setAddSpecality();
                admin.specialityFilter = "";
                alert("Спеціальність додано");
            });
        }
        else {
            alert("Введіть коректні дані");
        }
    };
    admin.SetEditSpecality= function (_speciality) {
        $log.debug(admin.addSpec);
        admin.correctSpeciality = 'Відредагуйте Спеціальність';
        admin.addSpec = fitfire.SetSpecialnist(_speciality.$id);
    };
    admin.UpdateSpec = function (_speciality) {
        fitfire.updateSpec(_speciality).then(function () {
            alert("Запис відредаговано");
            admin.setAddSpecality();
        })
    };
    admin.RemoveSpec = function (_spec) {
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
            fitfire.RemoveSpec(fitfire.SetSpecialnist(_spec.$id)).then(function () {
                alert("Запис видалено");
                admin.setAddSpecality();
                admin.specialityFilter="";
            })
        }
    }
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