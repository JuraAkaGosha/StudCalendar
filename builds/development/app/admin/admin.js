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