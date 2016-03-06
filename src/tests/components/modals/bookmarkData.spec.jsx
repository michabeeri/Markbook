define(['React', 'reactDOM', 'components/modals/BookmarkData', 'constants'],
    function (React, ReactDOM, BookmarkData, constants) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bookmark Data Modal', function () {

            function createDemoAddBookmarkModal() {
                var bookmarkListItemsData = [
                    {
                        id: '002',
                        title: 'Bookmark 2 title',
                        date: new Date(2012, 10, 9),
                        children: null,
                        url: "www.tweeter.com"
                    },
                    {
                        id: '001',
                        title: 'Gaspar Noe Movies',
                        date: new Date(2012, 10, 9),
                        children: Array(2).fill({})
                    }
                ];
                var state =
                {
                    modals: {type: constants.eModalType.MODAL_ADD_BOOKMARK, id: '002'},
                    bookmarks: bookmarkListItemsData
                };
                var dispatchSpy = jasmine.createSpy('dispatchSpy');
                var closeSpy = jasmine.createSpy('closeSpy');
                return TestUtils.renderIntoDocument(<BookmarkData dispatch={dispatchSpy}
                                                                  state={state}
                                                                  close={function(){}}/>);
            }

            describe('Bookmark Add', function () {

                it('should call dispatch', function () {
                    var reactComp = createDemoAddBookmarkModal();
                    var domNode = ReactDOM.findDOMNode(reactComp);

                    var saveBookmark = TestUtils.findRenderedDOMComponentWithTag(reactComp, 'button');

                    TestUtils.Simulate.click(saveBookmark);

                    expect(reactComp.props.dispatch).toHaveBeenCalled();
                });

                xit('should call dispatch with proper input', function () {
                    //add tags and group
                    var bookmark = {
                        bookmarkName: 'Demo Name',
                        bookmarkUrl: 'www.google.com'
                    };

                    var bookmarkNameNode = domNode.querySelector("input[name=BookmarkName]");
                    var bookmarkUrlNode = domNode.querySelector("input[name=BookmarkUrl]");

                    bookmarkNameNode.value = bookmark.bookmarkName;
                    bookmarkUrlNode.value = bookmark.bookmarkUrl;

                    var saveBookmark = TestUtils.findRenderedDOMComponentWithTag(reactComp, 'button');
                    TestUtils.Simulate.click(saveBookmark);

                    //add parameters after adding a group
                    expect(reactComp.props.dispatch).toHaveBeenCalledWith();
                });
            });

            describe('Bookmark Edit', function () {

                it('should call render button with Save word', function () {
                    var reactComp = createDemoAddBookmarkModal();
                    var editBookmark = TestUtils.findRenderedDOMComponentWithTag(reactComp, 'button');
                    expect(editBookmark.innerHTML).toMatch(/Save/);
                });
            });
        });
    });
