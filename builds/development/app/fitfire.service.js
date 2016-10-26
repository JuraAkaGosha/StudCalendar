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