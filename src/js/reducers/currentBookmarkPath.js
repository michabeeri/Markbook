define(['lodash', 'constants'], function (_, Constants) {
    'use strict';

    var initialState = [Constants.ROOT_GROUP_ID];

    return function currentBookmarkPath(state, action) {
        if (_.isUndefined(state)) {
            return initialState;
        }

        switch (action.type) {

            case Constants.NAVIGATE_TO_PREVIOUS_GROUP:
                var index = _.indexOf(state, action.id);
                return state.slice(0, index + 1);

            case Constants.OPEN_BOOKMARK_GROUP:
                return state.concat(action.id);

            case Constants.LOGOUT:
                return initialState;

            case Constants.SET:
                return action.prevState.currentBookmarkPath;

            default:
                return state;
        }
    };
});
