define(['lodash', 'constants', 'actionProviders/actions'], function (_, Constants, ActionProvider) {

    'use strict';

    return function removeBookmarkMiddleware(store) {
        return function (next) {
            return function (action) {

                if (action.type !== Constants.REMOVE_BOOKMARK) {
                    return next(action);
                }

                var state = store.getState();
                var highestDeletedGroup = getHighestGroupToDelete(action.id);
                var lowestRemainingGroup = _.find(state.bookmarks, function (bm) {
                    return bm.children && bm.children.indexOf(highestDeletedGroup) !== -1;
                });
                var idsToRemove = getIdsToRemove(highestDeletedGroup);

                function getIdsToRemove(bookmarkId) {
                    var ids = [bookmarkId];
                    var bookmark = _.find(state.bookmarks, {id: bookmarkId});

                    if (bookmark.children) {
                        bookmark.children.forEach(function (id) {
                            ids = ids.concat(getIdsToRemove(id));
                        });
                    }
                    return ids;
                }

                function getHighestGroupToDelete(id) {
                    var parentGroup = _.find(state.bookmarks, function (bm) {
                        return bm.children && bm.children.indexOf(id) !== -1;
                    });

                    if (parentGroup.id === Constants.ROOT_GROUP_ID || parentGroup.children.length > 1) {
                        return id;
                    }

                    return getHighestGroupToDelete(parentGroup.id);
                }

                if (lowestRemainingGroup.id !== _.last(state.currentBookmarkPath)) {
                    store.dispatch(ActionProvider.navigateToPreviousGroup(lowestRemainingGroup.id));
                }

                return next(Object.assign(action, {idsToRemove: idsToRemove}));
            };
        };
    };
});
