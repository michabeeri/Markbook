define(['lodash', 'constants', 'utils/relationshipTreeUtil', 'utils/bookmarksUtil', 'actionProviders/actions'], function (_, Constants, RelationshipTreeUtil, BookmarkUtil, ActionProvider) {

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

                switch (action.type) {

                    case Constants.REMOVE_BOOKMARK:
                        return (function () {
                            var state = store.getState();
                            var relationshipTree = RelationshipTreeUtil.getRelationshipTree(state.bookmarks, Constants.ROOT_GROUP_ID);
                            var idsToRemove = RelationshipTreeUtil.getIdsToRemove(relationshipTree, action.ids);

                            _.remove(idsToRemove, function neverDeleteRootGroup(id) {
                                return id === Constants.ROOT_GROUP_ID;
                            });

                            var currentOpenGroupId = _.last(fixBookmarksPath(idsToRemove, state.currentBookmarkPath.slice()));
                            Object.assign(action, {ids: idsToRemove});

                            if (currentOpenGroupId !== _.last(state.currentBookmarkPath)) {
                                next(Object.assign(action, {incomplete: true}));
                                store.dispatch(ActionProvider.navigateToPreviousGroup(currentOpenGroupId));
                                return ActionProvider.nop();
                            }
                            return next(action);
                        }());

                    case Constants.REMOVE_REPARENT_CHILDREN:
                        return (function () {
                            var state = store.getState();
                            var parentGroup = BookmarkUtil.getParent(state.bookmarks, action.id);

                            if (parentGroup !== _.last(state.currentBookmarkPath)) {
                                next(Object.assign(action, {incomplete: true}));
                                store.dispatch(ActionProvider.navigateToPreviousGroup(parentGroup.id));
                                return ActionProvider.nop();
                            }
                            return next(action);
                        }());

                    default :
                        return next(action);
                }
            };
        };
    };
});
