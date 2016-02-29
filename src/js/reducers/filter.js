define(['constants'], function (Constants) {
    'use strict';

    var initialState = {
        tag: '',
        title: ''
    };

    return function filter(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.SET_FILTER:
                return {
                    tag: action.tag,
                    title: action.title
                };

            default:
                return state;
        }
    };
});
