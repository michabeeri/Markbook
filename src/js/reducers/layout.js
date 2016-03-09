define(['constants', 'utils/localStorageUtil'], function (Constants, LocalStorageUtil) {
    'use strict';

    var initialState = {
        layoutType: LocalStorageUtil.getDefaultLayout()
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

            case Constants.SET:
                return action.prevState.layout;

            default:
                return state;
        }
    };
});
