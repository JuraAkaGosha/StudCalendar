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