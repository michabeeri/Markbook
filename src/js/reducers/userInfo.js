define(['constants'], function (Constants) {
    'use strict';

    var initialState = {
        username: null,
        uid: null,
        token: null
    };

    return function userInfo(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.LOGIN:
                return {username: action.username, uid: action.uid, token: action.token};

            case Constants.LOGOUT:
                return initialState;

            case Constants.SET:
                return action.prevState.userInfo;

            default:
                return state;
        }
    };
});
