/**
 * Created by lirank on 24/02/16.
 */

define(['Firebase'], function (Firebase) {

    'use strict';

    var LoginManager = {

        passwordMinLength: 6,

        RESULT_VALUES: {
            success: 'success',
            passwordsDontMatch: 'Passwords don\'t match',
            userAlreadyRegistered: 'User already exists',
            passwordMissingAlpha: 'Password should contain a both letters and digits',
            passwordMissingDigit: 'Password should contain a both letters and digits',
            emailInvalid: 'Invalid Email',
            passwordTooShort: 'Password is too short',
            loginFailed: 'Invalid email or password'
        },

        isLoggedIn: function () {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            return !(!fireBaseRef.getAuth());
        },

        logout: function () {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            fireBaseRef.unauth();
        },

        authenticateUser: function (email, password, successCallback, failureCallback) {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            var self = this;
            fireBaseRef.authWithPassword({
                email: email, password: password
            }, function (error, authData) {
                if (error) {
                    console.log('Login failed: ', error);
                    failureCallback(self.RESULT_VALUES.loginFailed);
                } else {
                    console.log('Authentication successful, payload: ', authData);
                    successCallback(email, authData.uid, authData.token);
                }
            });
        },

        validateSignUpInfo: function (password, passwordRepeat) {
            if (password !== passwordRepeat) {
                return this.RESULT_VALUES.passwordsDontMatch;
            }
            if (password.length < this.passwordMinLength) {
                return this.RESULT_VALUES.passwordTooShort;
            }
            if (password.match(/\d+/g) === null) {
                return this.RESULT_VALUES.passwordMissingDigit;
            }
            if (password.match(/[A-Z,a-z]+/) === null) {
                return this.RESULT_VALUES.passwordMissingAlpha;
            }
            return this.RESULT_VALUES.success;
        },

        createUserOnDataBase: function (email, password, successCallback, failureCallback) {

            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            var self = this;
            fireBaseRef.createUser({
                email: email, password: password
            }, function (error, userData) {
                if (error) {
                    switch (error.code) {
                        case 'EMAIL_TAKEN':
                            failureCallback(self.RESULT_VALUES.userAlreadyRegistered);
                            console.log('User already registered');
                            break;
                        case 'INVALID_EMAIL':
                            failureCallback(self.RESULT_VALUES.emailInvalid);
                            console.log('Invalid email');
                            break;
                    }
                } else {
                    console.log('Successfully created user with uid: ' + userData.uid);
                    self.authenticateUser(email, password, successCallback, failureCallback);
                }
            });

        },

        saveToFireBase: function (dataToSave) {
            var fireBaseRef = new Firebase('https://markbook.firebaseio.com/');
            fireBaseRef.set(dataToSave);
        },

        getLoggedInUserInfo: function () {
            var fb = new Firebase('markbook.firebaseio.com');
            return fb.getAuth();
        }

    };

    return LoginManager;

});
