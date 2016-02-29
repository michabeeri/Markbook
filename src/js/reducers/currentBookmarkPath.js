define(['constants'], function (Constants) {
    'use strict';

    var initialState = ['a', 'b', 'c'];

    return function currentBookmarkPath(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.NAVIGATE_TO_PREVIOUS_GROUP:
                return state.slice(0, state.length - 1);

            default:
                return state;
        }
    };
});
