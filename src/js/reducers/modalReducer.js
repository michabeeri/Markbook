define(['constants'], function (Constants) {
    'use strict';

    var initialState = null;

    return function userInfo(state, action) {
        if (_.isUndefined(state)) {
            return initialState;
        }

        switch (action.type) {

            case Constants.OPEN_MODAL:
                return {
                    type: action.modalType,
                    id: action.bookmarkId
                };

            case Constants.CLOSE_MODAL:
                return initialState;

            case Constants.LOGOUT:
                return initialState;

            case Constants.SET:
                return action.prevState.modals;

            default:
                return state;
        }
    };
});
