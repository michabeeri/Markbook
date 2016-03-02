define(['constants'], function (Constants) {
    'use strict';

    var initialState = {
        username: 'liran@bm.bm',
        uid: '27b6ada8-7dc6-4117-8520-09ca0562ff12',
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
