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
                    id: action.id
                };

            case Constants.CLOSE_MODAL:
                return initialState;

            default:
                return state;
        }
    };
});
