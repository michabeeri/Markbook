define([], function () {
    'use strict';

    var initialState = {
        username: 'user@wix.com'
    };

    return function userInfo(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            default:
                return state;
        }
    };
});
