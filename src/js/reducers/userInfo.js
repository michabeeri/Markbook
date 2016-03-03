define(['constants', 'developer'], function (Constants, Developer) {
    'use strict';

    var initialState = {
        username: Developer.username,
        uid: Developer.uid,
        token: null
    };

    return function userInfo(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.LOGIN:
                return {username: action.username, uid: action.uid, token: action.token};

            default:
                return state;
        }
    };
});
