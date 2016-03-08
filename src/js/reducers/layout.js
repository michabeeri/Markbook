define(['constants'], function (Constants) {
    'use strict';

    var initialState = {
        layoutType: Constants.layoutType.GRID
    };

    return function sort(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.SET_LAYOUT:
                return {
                    layoutType: action.layoutType
                };

            case Constants.LOGOUT:
                return initialState;

            default:
                return state;
        }
    };
});
