define(['lodash', 'utils/bookmarksUtil'], function (_, BookmarksUtil) {
    'use strict';

    describe('bookmarks utils', function () {

        describe('filterItems', function () {
            var items;

            beforeEach(function () {
                items = [
                    {
                        title: 'a',
                        date: new Date(2015, 10, 18),
                        children: null,
                        tags: ['a']
                    },
                    {
                        title: 'abc',
                        date: new Date(2012, 10, 9),
                        children: null,
                        tags: ['abc', 'abcd']
                    },
                    {
                        title: 'bc',
                        date: new Date(2012, 10, 9),
                        children: null,
                        tags: ['bc']
                    }];
            });

            it('should return items filtered by searchTerm grouped by given properties', function () {
                var results = BookmarksUtil.filterItems(items, 'a', ['title', 'tags']);

                expect(results.title).toEqual(['a', 'abc']);
                expect(results.tags).toEqual(['a', 'abc', 'abcd']);

            });

            it('should not return duplicates for each property', function () {
                items.push({
                    title: 'a',
                    date: new Date(2015, 10, 18),
                    children: null,
                    tags: ['a', 'aa']
                });

                var results = BookmarksUtil.filterItems(items, 'a', ['title', 'tags']);

                expect(_.countBy(results.title).a).toEqual(1);
                expect(_.countBy(results.tags).a).toEqual(1);
            });
        });

        describe('isCurrentGroup', function () {
            it('should return true if given group id is of current group in path', function () {
                var ROOT_GROUP_ID = 'Root';
                var CURRENT_GROUP_ID = 'currentGroup';
                var path = [ROOT_GROUP_ID, CURRENT_GROUP_ID];
                var isCurrentGroup = BookmarksUtil.isCurrentGroup(path, CURRENT_GROUP_ID);

                expect(isCurrentGroup).toBeTruthy();
            });
        });

        describe('getBookmarkById', function () {
            it('should return bookmark given an id', function () {
                var groupId = 'GROUP_ID';
                var groupTitle = 'GROUP_TITLE';
                var expectedBookmark = {
                    id: groupId,
                    title: groupTitle
                };
                var bookmarks = [expectedBookmark];

                var actualBookmark = BookmarksUtil.getBookmarkById(bookmarks, groupId);
                expect(actualBookmark).toBe(expectedBookmark);
            });
        });

        describe('getItemsByGroupId', function () {
            it('should return children items of given group id', function () {
                var expectedChildBookmarks = [{id: 'bm0001'}, {id: 'bm0002'}];
                var bookmarks = [{id: 'ROOT_GROUP_ID', children: ['bm0001', 'bm0002']}].concat(expectedChildBookmarks);

                var bookmarkChildItems = BookmarksUtil.getItemsByGroupId(bookmarks, 'ROOT_GROUP_ID');
                expect(bookmarkChildItems).toEqual(expectedChildBookmarks);
            });
        });

        describe('getCurrentGroupItems', function () {
            it('should return children items of current group in path', function () {
                var ROOT_GROUP_ID = 'ROOT_GROUP_ID';
                var path = [ROOT_GROUP_ID];
                var expectedChildBookmarks = [{id: 'bm0001'}, {id: 'bm0002'}];
                var bookmarks = [{id: ROOT_GROUP_ID, children: ['bm0001', 'bm0002']}].concat(expectedChildBookmarks);

                var bookmarkChildItems = BookmarksUtil.getCurrentGroupItems(bookmarks, path);
                expect(bookmarkChildItems).toEqual(expectedChildBookmarks);
            });
        });

        describe('getAllGroups', function () {
            it('should return an array with only group items', function () {
                var bookmarks = [
                    {children: ['bm0001', 'bm0002', 'bm0003', 'bm0004']},
                    {children: null},
                    {children: ['bk']}
                ];

                var groups = BookmarksUtil.getAllGroups(bookmarks);
                expect(groups.length).toEqual(2);
            });
        });

    });

});
