define(['lodash', 'constants', 'actionProviders/actions'], function (_, Constants, ActionProvider) {

    'use strict';

    return function layoutListMiddleware(store) {
        return function (next) {
            return function (action) {

                if (action.type !== Constants.SET_LAYOUT || action.layoutType === Constants.layoutType.GRID) {
                    return next(action);
                }

                var state = store.getState();
                var currentGroupId = state.currentBookmarkPath[state.currentBookmarkPath.length - 1];
                var itemsToDeselect = _.filter(state.bookmarks, function isCurrentGroup(item) {
                    return item.id === currentGroupId;
                })[0].children;
                next(Object.assign(action, {incomplete: true}));
                store.dispatch(ActionProvider.selectDeselectAll(itemsToDeselect, false));

                return ActionProvider.nop();

            };
        };
    };
});
