/**
 * Created by lirank on 29/02/16.
 */

define(['Firebase', 'constants'], function (Firebase, Constants) {

    'use strict';

    var DataBaseApi = {

        writeUserData: function (username, data) {
            var fireBaseRef = new Firebase(Constants.APP_ROOT_DATA + username);
            fireBaseRef.set(data);
        },

        readUserData: function (username, callback) {
            var fireBaseRef = new Firebase(Constants.APP_ROOT_DATA + username);
            var dataReceived;
            fireBaseRef.on('value', function (snapshot) {
                dataReceived = snapshot.exportVal();
                callback(dataReceived);
            }, function (errorObject) {
                console.log('An error has occurred when reading data: ' + errorObject.code);
            });
        }

    };

    return DataBaseApi;

});
