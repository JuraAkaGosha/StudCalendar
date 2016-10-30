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
    }
})()