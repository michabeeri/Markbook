define(['lodash', 'utils/bookmarksUtil'], function (_, BookmarksUtil) {
    'use strict';

    describe('bookmarks utils', function () {

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

});
