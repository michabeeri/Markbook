define(['lodash', 'constants', 'actionProviders/actions'], function (_, Constants, ActionProvider) {

    'use strict';

    return function removeBookmarkMiddleware(store) {
        return function (next) {
            return function (action) {

                switch (action.type) {
                    case Constants.ADD_BOOKMARK_AND_GROUP:
                    case Constants.ADD_BOOKMARK:
                        next(Object.assign(action, {incomplete: true}));
                        store.dispatch(ActionProvider.turnOffFlag(Constants.FIRST_VISIT_FLAG));
                        return ActionProvider.nop();

                    default:
                        return next(action);
                }

            };
        };
    };
});
