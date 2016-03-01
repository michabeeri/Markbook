define(['React', 'reactDOM', 'components/modals/AddBookmarkModal'],
    function (React, ReactDOM, AddBookmarkModal) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Add Bookmark Modal', function () {

            function createDemoAddBookmarkModal() {
                var dispatchSpy = jasmine.createSpy('callback');
                return TestUtils.renderIntoDocument(<AddBookmarkModal dispatch={dispatchSpy}
                                                                      state={{}}
                                                                      classNameAddBookmark='modal modal-opened'
                                                                      closeModal={function(){}}/>);
            }

            it('should call dispatch with proper input', function () {
                var bookmark = {
                    bookmarkName: 'Demo Name',
                    bookmarkUrl: 'www.google.com'
                };
                var reactComp = createDemoAddBookmarkModal();
                var domNode = ReactDOM.findDOMNode(reactComp);
                var bookmarkNameNode = domNode.querySelector("input[name=BookmarkName]");
                var bookmarkUrlNode = domNode.querySelector("input[name=BookmarkUrl]");
                var saveBookmark = TestUtils.findRenderedDOMComponentWithTag(reactComp, 'button');
                bookmarkNameNode.value = bookmark.bookmarkName;
                bookmarkUrlNode.value = bookmark.bookmarkUrl;
                TestUtils.Simulate.click(saveBookmark);

                expect(reactComp.props.dispatch).toHaveBeenCalled();
            });


        });

    });
