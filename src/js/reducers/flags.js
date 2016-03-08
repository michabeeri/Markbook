define(['constants'], function (Constants) {
    'use strict';

    var initialState = {};

    return function filter(state, action) {
        if (!state) {
            return initialState;
        }

        var flag;

        switch (action.type) {

            case Constants.ADD_FLAG:
                flag = {};
                flag[action.flag] = true;
                return _.assign({}, state, flag);

            case Constants.REMOVE_FLAG:
                flag = {};
                flag[action.flag] = false;
                return _.assign({}, state, flag);

            case Constants.LOGOUT:
                return initialState;

            default:
                return state;
        }
    };
});
