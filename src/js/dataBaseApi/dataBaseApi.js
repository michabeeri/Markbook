
define(['Firebase', 'constants'], function (Firebase, Constants) {

    'use strict';

    var DataBaseApi = {

        writeUserData: function (uid, data) {
            var fireBaseRef = new Firebase(Constants.APP_ROOT_DATA + 'users/' + uid);
            fireBaseRef.set(data);
        },

        readUserData: function (username, callback) {
            var fireBaseRef = new Firebase(Constants.APP_ROOT_DATA + 'users/' + username);
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
