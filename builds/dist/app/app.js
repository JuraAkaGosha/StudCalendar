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
            DayArr =$firebaseArray(ref.child('day')),
            specialityArr = $firebaseArray(ref.child('specialty')),
            mainArr = $firebaseArray(mainRef);
        this.getDay = function (cb) {
            return DayArr.$loaded(cb);
        };
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
        // add Group
        this.addGroup = function(_group, _cb){
            var GroupLength = $firebaseObject(ref.child('id_count').child('group'));
            GroupLength.$loaded(function () {
                var GLength = ++GroupLength.$value;
                GroupLength.$save();
                ref.child('group').child(GLength).set(_group, _cb);
            });
        };
        // set Group
        this.SetGroup = function (_id) {
            return GroupArr.$getRecord(_id);
        };
        // updateGroup
        this.updateGroup = function (_group) {
            return GroupArr.$save(_group);
        };
        // Remove Group
        this.RemoveGroup = function (_group) {
            return GroupArr.$remove(_group);
        };
        // Teacher

        this.getTeachers = function (cb) {
            return TeachersArr.$loaded(cb);
        };
        // add teacher
        this.addTeacher = function (_teach, _cb) {
            var TeachLength = $firebaseObject(ref.child('id_count').child('teachers'));
            TeachLength.$loaded(function () {
                var TLength = ++TeachLength.$value;
                TeachLength.$save();
                ref.child('teachers').child(TLength).set(_teach, _cb);
            });
        };
        // set teacher
        this.SetTeacher =function (_id) {
            return TeachersArr.$getRecord(_id);
        }
// update teacher
        this.updateTeacher = function (_teacher) {
            return TeachersArr.$save(_teacher);
        };
        this.RemoveTeacher = function (_teacher) {
            return TeachersArr.$remove(_teacher);
        };
        // NumberOfPai
        // r
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
        this.addMain = function(_main, _cb){
            var MainLength = $firebaseObject(ref.child('id_count').child('main'));
            MainLength.$loaded(function () {
                var MLength = ++MainLength.$value;
                MainLength.$save();
                ref.child('main').child(MLength).set(_main, _cb);
            });
        };
        this.SetMain = function (_id) {
            return mainArr.$getRecord(_id);
        }
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
    //day
    fitfire.getDay(function (_d) {
        admin.day = _d;
    });
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
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
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
                admin.facultFilter = "";
            })
        }
    }
    //end Факультет
    fitfire.getMain(function (_d) {
        admin.main = _d;
    });
// Group
    fitfire.getGroup(function (_d) {
        admin.group = _d;
    });
    admin.setAddGroup = function () {
        admin.addGroup = {
            name: "",
            id_specialty: null
        };
        admin.correctGroup = 'Введіть назву групи';
    }
    admin.addGroupFunc = function () {
        if (admin.addGroup.name != "") {
            fitfire.addGroup(admin.addGroup, function () {
                admin.setAddGroup();
                alert("Групу додано");
            });
        }
        else {
            alert("Введіть назву групи");
        }
    };
    admin.SetEditGroup = function (_group) {
        admin.correctFacult = 'Відредагуйте групу';
        admin.addGroup = fitfire.SetGroup(_group.$id);
    };
    // Update Group
    admin.UpdateGroup = function (_group) {
        fitfire.updateGroup(_group).then(function () {
            alert("Запис відредаговано");
            admin.setAddGroup();
        })
    };
    // Remove Group
    admin.RemoveGroup = function (_group) {
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
            fitfire.RemoveGroup(fitfire.SetGroup(_group.$id)).then(function () {
                alert("Запис видалено");
                admin.setAddGroup();
                admin.groupFilter = "";
            })
        }
    }
    // End Group
    // begin teacher
    fitfire.getTeachers(function (_d) {
        admin.teacher = _d;
    });
    admin.SetAddTeacher = function () {
        admin.addTeacher = {
            name: "",
            secondname: "",
            surname: ""
        };
        admin.correctTeacher = 'Введіть викладача';
    }
    admin.addTeacherFunc = function () {
        fitfire.addTeacher(admin.addTeacher, function () {
            admin.SetAddTeacher();
            alert("Викладача додано");
        });
    };
    admin.SetEditTeacher = function (_teacher) {
        admin.correctTeacher = 'Відредагуйте викладача';
        admin.addTeacher = fitfire.SetTeacher(_teacher.$id);
    }
// Update Teacher
    admin.UpdateTeacher = function (_teacher) {
        fitfire.updateTeacher(_teacher).then(function () {
            alert("Запис відредаговано");
            admin.SetAddTeacher();
        })
    };
    admin.RemoveTeacher = function (_teacher) {
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
            fitfire.RemoveTeacher(fitfire.SetTeacher(_teacher.$id)).then(function () {
                alert("Запис видалено");
                admin.SetAddTeacher();
            })
        }
    }
    // end teacher
    fitfire.getNumberofPair(function (_d) {
        admin.NumberofPair = _d;
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
        admin.sendSpec = {};
        admin.sendSpec = {
            name: admin.addSpec.name,
            id_faculty: parseInt(admin.addSpec.id_faculty)
        }
        angular.element("#addSpec").button('loading');
        if (admin.addSpec.name != "" && admin.addSpec.id_faculty != null) {
            fitfire.addSpeciality(admin.sendSpec, function () {
                admin.setAddSpecality();
                admin.specialityFilter = "";
                angular.element("#addSpec").button('reset');
                alert("Спеціальність додано");
            });
        }
        else {
            alert("Введіть коректні дані");
        }
    };

    admin.SetEditSpecality = function (_speciality) {
        admin.correctSpeciality = 'Відредагуйте Спеціальність';
        admin.addSpec = fitfire.SetSpecialnist(_speciality.$id);
    };
    admin.UpdateSpec = function (_speciality) {
        fitfire.updateSpec(_speciality).then(function () {
            alert("Запис відредаговано");
            admin.setAddSpecality();
        })
    };
    //
    admin.RemoveSpec = function (_spec) {
        admin.result = confirm("Ви впевнені, що хочете видалити запис? При видаленні запису можуть виникнути помилки В відображенні розкладу.");
        if (admin.result) {
            fitfire.RemoveSpec(fitfire.SetSpecialnist(_spec.$id)).then(function () {
                alert("Запис видалено");
                admin.setAddSpecality();
                admin.specialityFilter = "";
            })
        }
    };
    admin.reset = function () {
        admin.specialityFilter = "";
        admin.groupFilter = "";
        admin.teacherFilter = "";
        admin.facultFilter = "";
        admin.specialityFilter = "";
        admin.lessonFilter = "";
    };
    admin.addMainFunc = function () {
        $log.debug(admin.addMain);
        fitfire.addMain(admin.addMain, function () {
            admin.setAddSpecality();
            admin.addMain = "";
            admin.filterToAddFacult = "";
            angular.element("#addSpec").button('reset');
            alert("Спеціальність додано");
        });
    }
    admin.SetEditMain = function (_main) {
        admin.addMain = fitfire.SetMain(_main.$id);
    };
    angular.element('#speciality-dialog').on('hidden.bs.modal', function (e) {
        $log.debug("lol");
        admin.setAddSpecality();
    });
    admin.lessonShow = function (_id_lesson) {
        return fitfire.SetDusc(_id_lesson).name;
    }
    admin.GroupShow = function (_id_group) {
        return fitfire.SetGroup(_id_group).name;
    }
    admin.ShowTeacher = function (_teacher) {
        return fitfire.SetTeacher(_teacher).surname + " "+fitfire.SetTeacher(_teacher).name + " "+fitfire.SetTeacher(_teacher).secondname;
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