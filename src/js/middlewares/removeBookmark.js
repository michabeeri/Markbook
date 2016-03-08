define(['lodash', 'constants', 'utils/relationshipTreeUtil', 'actionProviders/actions'], function (_, Constants, RelationshipTreeUtil, ActionProvider) {

    'use strict';

    function fixBookmarksPath(idsToRemove, bookmarkPath) {
        if (idsToRemove.indexOf(_.last(bookmarkPath)) !== -1) {
            bookmarkPath.pop();
            return fixBookmarksPath(idsToRemove, bookmarkPath);
        }
        return bookmarkPath;
    }

    return function removeBookmarkMiddleware(store) {
        return function (next) {
            return function (action) {

                if (action.type !== Constants.REMOVE_BOOKMARK) {
                    return next(action);
                }

                var state = store.getState();
                var relationshipTree = RelationshipTreeUtil.getRelationshipTree(state.bookmarks, Constants.ROOT_GROUP_ID);
                var idsToRemove = RelationshipTreeUtil.getIdsToRemove(relationshipTree, action.ids);

                _.remove(idsToRemove, function neverDeleteRootGroup(id) {
                    return id === Constants.ROOT_GROUP_ID;
                });

                var currentOpenGroup = _.last(fixBookmarksPath(idsToRemove, state.currentBookmarkPath.slice()));

                if (currentOpenGroup !== _.last(state.currentBookmarkPath)) {
                    store.dispatch(ActionProvider.navigateToPreviousGroup(currentOpenGroup));
                }

                return next(Object.assign(action, {ids: idsToRemove}));
            };
        };
    };
});
