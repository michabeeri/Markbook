define(['React', 'reactDOM', 'router', 'components/loginManager/loginManager'], function (React, ReactDOM, ReactRouter, loginManager) {

    'use strict';

    //var ReactTestUtils = React.addons.TestUtils;


    describe('Login', function () {

        describe('Valid Database', function () {

            describe('Validate input for signup', function () {

                it('should return password too short when password is too short', function () {
                    expect(loginManager.validateSignUpInfo('Qwe1', 'Qwe1')).toEqual(loginManager.RESULTVALUES.passwordTooShort);
                });

                it('should return passwords dont match when passwords dont match', function () {
                    expect(loginManager.validateSignUpInfo('Qwerty1', 'Qwerty2')).toEqual(loginManager.RESULTVALUES.passwordsDontMatch);
                });

                it('should return password missing alpha when password missing alpha', function () {
                    expect(loginManager.validateSignUpInfo('12345678', '12345678')).toEqual(loginManager.RESULTVALUES.passwordMissingAlpha);
                });

                it('should return password missing digit when password missing digit', function () {
                    expect(loginManager.validateSignUpInfo('Qwerty', 'Qwerty')).toEqual(loginManager.RESULTVALUES.passwordMissingDigit);
                });

            });

            describe('Save data to FireBase', function () {

                xit('Save data to firebase', function () {
                    loginManager.createUserOnDataBase('a@b.com', 'Qwerty1');
                });


            });

            describe('Manage users database', function () {

                it('should save the users database', function () {

                });

                it('should load the users database', function () {

                });

                it('should save and load the same database', function () {

                });

            });

            describe('Authenticating users', function () {

                it('should return false when user is not registered', function () {

                });

                it('should return true when user is registered and correct credentials given', function () {

                });

                it('should return true when false is registered and incorrect credentials given', function () {

                });

            });

        });

        describe('Invalid Database', function () {

            it('should return false when JSON is corrupted', function () {

            });

        });

    });

});

