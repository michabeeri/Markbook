define(['lodash', 'constants', 'actionProviders/actions'], function (_, Constants, ActionProvider) {

    'use strict';

    return function removeBookmarkMiddleware(store) {
        return function (next) {
            return function (action) {

                switch (action.type) {
                    case Constants.ADD_BOOKMARK_AND_GROUP:
                    case Constants.ADD_BOOKMARK:
                        store.dispatch(ActionProvider.turnOffFlag(Constants.FIRST_VISIT_FLAG));
                        return next(action);

                    default:
                        return next(action);
                }

            };
        };
    };
});
