define(['react', 'reactDOM', 'components/bookmarkList/bookmarkList', 'components/bookmarkList/bookmarkGroup', 'components/bookmarkList/bookmark'],
    function (React, ReactDOM, BookmarkList, BookmarkGroup, Bookmark) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bookmark list', function () {

            var bookmarkList,
                bookmarkListItemsData;

            beforeEach(function () {
                bookmarkListItemsData = [
                    {
                        title: 'Fargo Season 2',
                        date: new Date(2015, 10, 18),
                        children: null
                    },
                    {
                        title: 'Fargo Season 1',
                        date: new Date(2014, 11, 10),
                        children: null
                    },
                    {
                        title: 'Bookmark 2 title',
                        date: new Date(2012, 10, 9),
                        children: null
                    },
                    {
                        title: 'Gaspar Noe Movies',
                        date: new Date(2012, 10, 9),
                        children: Array(4).fill({})
                    }
                ];
                bookmarkList = TestUtils.renderIntoDocument(<BookmarkList state={{bookmarks: bookmarkListItemsData}}/>);
            });

            it('should populate items list', function () {
                expect(TestUtils.scryRenderedComponentsWithType(bookmarkList, Bookmark).length).toBe(3);
                expect(TestUtils.scryRenderedComponentsWithType(bookmarkList, BookmarkGroup).length).toBe(1);
            });
        });
    });
