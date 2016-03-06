/**
 * Created by lirank on 24/02/16.
 */

define(['Firebase'], function (Firebase) {

    'use strict';

    var LoginManager = {

        passwordMinLength: 6,

        RESULTVALUES: {
            success: 1,
            passwordsDontMatch: -1,
            userAlreadyRegistered: -2,
            passwordMissingAlpha: -3,
            passwordMissingDigit: -4,
            emailInvalid: -5,
            passwordTooShort: -6
        },

        //hash: function (message) {
        //    var hash = md5.create();
        //    hash.update(message);
        //    return hash.hex();
        //},
        //
        //createSalt: function () {
        //    return Math.random().toString(36).substring(7);
        //},
        //
        //hashWithSalt: function (message) {
        //    return this.hash(message + this.createSalt());
        //},
        //
        //isUserExists: function (username) {
        //    for (var i = 0; i < users.length; i++) {
        //        if (users[i].username === username) {
        //            return true;
        //        }
        //    }
        //    return false;
        //},
        //
        //isValidEmail: function (email) {
        //    if (email.indexOf('@') === -1) {
        //        return false;
        //    }
        //    var temp = email.substr(email.indexOf('@'));
        //    if (temp.indexOf('.') === -1) {
        //        return false;
        //    }
        //    return true;
        //},
        //

        isLoggedIn: function () {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            return !(!fireBaseRef.getAuth());
        },

        logout: function () {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            fireBaseRef.unauth();
        },

        authenticateUser: function (email, password, successCallback) {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            fireBaseRef.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    console.log('Login failed: ', error);
                } else {
                    console.log('Authentication successful, payload: ', authData);
                    successCallback(email, authData.uid, authData.token);
                }
            });
        },

        validateSignUpInfo: function (password, passwordRepeat) {
            if (password !== passwordRepeat) {
                return this.RESULTVALUES.passwordsDontMatch;
            }
            if (password.length < this.passwordMinLength) {
                return this.RESULTVALUES.passwordTooShort;
            }
            if (password.match(/\d+/g) === null) {
                return this.RESULTVALUES.passwordMissingDigit;
            }
            if (password.match(/[A-Z,a-z]+/) === null) {
                return this.RESULTVALUES.passwordMissingAlpha;
            }
            return this.RESULTVALUES.success;
        },

        createUserOnDataBase: function (email, password, passwordRepeat, successCallback) {
            var validateResult = this.validateSignUpInfo(password, passwordRepeat);
            if (validateResult !== this.RESULTVALUES.success) {
                console.log('Password error: ' + validateResult);
            } else {
                var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
                var self = this;
                fireBaseRef.createUser({
                    email: email, password: password
                }, function (error, userData) {
                    if (error) {
                        switch (error.code) {
                            case 'EMAIL_TAKEN':
                                //todo something
                                console.log('User already registered');
                                break;
                            case 'INVALID_EMAIL':
                                //todo something
                                console.log('Invalid email');
                                break;
                        }
                    } else {
                        console.log('Successfully created user with uid: ' + userData.uid);
                        self.authenticateUser(email, password, successCallback);
                    }
                });
            }

        },

        saveToFireBase: function (dataToSave) {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            fireBaseRef.set(dataToSave);
        }



    };

    return LoginManager;

});
