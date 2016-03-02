define(['React', 'reactDOM', 'router', 'components/dataBaseApi/dataBaseApi'], function (React, ReactDOM, ReactRouter, DataBase) {

    'use strict';

    describe('Read Data', function () {

        fit('should set and get the same data from the server', function () {
            var liran = {age: 30, surname: 'Kurtz'};
            DataBase.writeUserData('liran', liran);
            DataBase.readUserData('liran', function (message) {
                expect(message.age).toEqual(liran.age);
            });
        });

    });

});

