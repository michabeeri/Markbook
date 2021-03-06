define(['react', 'reactDOM', 'constants', 'components/bookmarkList/bookmarkList', 'components/bookmarkList/bookmark'],
    function (React, ReactDOM, Constants, BookmarkList, Bookmark) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bookmark list', function () {

            var bookmarkList,
                bookmarkListItemsData,
                mockDispatcher;

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

            xit('should filter bookmarks', function () {
                bookmarkList = TestUtils.renderIntoDocument(<BookmarkList
                    state={{
                        bookmarks: bookmarkListItemsData,
                        filter: {title: 'Fargo', tag: ''}
                        }}
                    dispatch={mockDispatcher}/>);
                expect(TestUtils.scryRenderedComponentsWithType(bookmarkList, Bookmark).length).toBe(2);
            });

            xit('should pass onEdit callback to child bookmarks', function () {
                mockDispatcher = function (action) {
                    expect(action.type).toBe(Constants.EDIT_BOOKMARK);
                }
                bookmarkList = TestUtils.renderIntoDocument(<BookmarkList
                    state={{bookmarks: bookmarkListItemsData}}
                    dispatch={mockDispatcher}
                />);
                TestUtils.scryRenderedComponentsWithType(bookmarkList, Bookmark)[0].props.onEdit();
            });

            xit('should pass onDelete callback to child bookmarks', function () {
                mockDispatcher = function (action) {
                    expect(action.type).toBe(Constants.REMOVE_BOOKMARK);
                }
                bookmarkList = TestUtils.renderIntoDocument(<BookmarkList
                    state={{bookmarks: bookmarkListItemsData}}
                    dispatch={mockDispatcher}
                />);
                TestUtils.scryRenderedComponentsWithType(bookmarkList, Bookmark)[0].props.onDelete();
            });
        });
    });




































