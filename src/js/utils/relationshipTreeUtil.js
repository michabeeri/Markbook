define(['lodash', 'constants', 'utils/bookmarksUtil'], function (_, Constants, BookmarkUtils) {
    'use strict';

    function getRelationshipTree(bookmarks, id) {
        var children = BookmarkUtils.getBookmarkById(bookmarks, id).children;
        return {
            id: id,
            children: children
                ? _.map(children, function (childId) { return getRelationshipTree(bookmarks, childId); })
                : [],
            isGroup: (children && children.length > 0)
        };
    }

    function getIdsToRemove(relationshipTree, initialSelection) {
        if (initialSelection.indexOf(relationshipTree.id) !== -1) {
            return getAllIds(relationshipTree);
        }

        if (!relationshipTree.isGroup) {
            return [];
        }

        var descendantIdsToRemove = relationshipTree.children.reduce(function (ids, node) {
            return ids.concat(getIdsToRemove(node, initialSelection));
        }, []);

        var allChildIds = _.map(relationshipTree.children, 'id');
        var allChildrenIncluded = allChildIds.length === _.intersection(allChildIds, descendantIdsToRemove).length;
        return allChildrenIncluded
            ? [relationshipTree.id].concat(descendantIdsToRemove)
            : descendantIdsToRemove;
    }

    function getAllIds(relationshipTree) {
        if (!relationshipTree.isGroup) {
            return [relationshipTree.id];
        }

        return relationshipTree.children.reduce(function (ids, node) {
            return ids.concat(getAllIds(node));
        }, [relationshipTree.id]);
    }

    return {
        getRelationshipTree: getRelationshipTree,
        getAllIds: getAllIds,
        getIdsToRemove: getIdsToRemove
    };
});
