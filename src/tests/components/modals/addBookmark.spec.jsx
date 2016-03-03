define(['React', 'reactDOM', 'components/modals/BookmarkData', 'constants'],
    function (React, ReactDOM, BookmarkData, constants) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Add Bookmark Modal', function () {

            function createDemoAddBookmarkModal() {
                var dispatchSpy = jasmine.createSpy('callback');
                return TestUtils.renderIntoDocument(<BookmarkData dispatch={dispatchSpy}
                                                                  state={{modals: {type: constants.eModalType.MODAL_ADD_BOOKMARK, id: ''}}}
                                                                  close={function(){}}/>);
            }

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
    });
