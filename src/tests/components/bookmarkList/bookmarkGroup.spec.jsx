define(['react', 'reactDOM', 'components/bookmarkList/bookmarkGroup'],
    function (React, ReactDOM, BookmarkGroup) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bookmark', function () {

            var bookmarkGroup,
                bookmarkData;

            beforeEach(function () {
                bookmarkData = {
                    title: 'Fargo Season 2',
                    children: Array(4).fill({})
                };
                bookmarkGroup = TestUtils.renderIntoDocument(<BookmarkGroup bookmarkData={bookmarkData}/>);
            });

            it('should render title in h1 tag', function () {
                expect(TestUtils.findRenderedDOMComponentWithTag(bookmarkGroup, 'h1').textContent).toBe('Fargo Season 2');
            });

            it('should render children count in h2 tag', function () {
                expect(TestUtils.findRenderedDOMComponentWithTag(bookmarkGroup, 'h2').textContent).toBe('4 items inside');
            });
        });
    });
