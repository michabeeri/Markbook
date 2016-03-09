define(['constants', 'utils/localStorageUtil'], function (Constants, LocalStorageUtil) {
    'use strict';

    var initialState = {
        sortType: LocalStorageUtil.getDefaultSortType()
    };

    return function sort(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {

            case Constants.SET_SORT_TYPE:
                return {
                    sortType: action.sortType
                };

            case Constants.LOGOUT:
                return initialState;

            case Constants.SET:
                return action.prevState.sort;

            default:
                return state;
        }
    };
});
