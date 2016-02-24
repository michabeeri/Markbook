define(['react', 'reactDOM', 'components/bookmarkList/bookmark'],
    function (React, ReactDOM, Bookmark) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bookmark', function () {

            var bookmark,
                itemData;

            beforeEach(function () {
                itemData = {
                        title: 'Fargo Season 2',
                        date: new Date(2015, 10, 18)
                    };
                bookmark = TestUtils.renderIntoDocument(<Bookmark itemData={itemData}/>);
            });

            it('should render title in h1 tag', function () {
                expect(TestUtils.findRenderedDOMComponentWithTag(bookmark, 'h1').textContent).toBe('Fargo Season 2');
            });

            it('should render formated date in h2 tag', function () {
                expect(TestUtils.findRenderedDOMComponentWithTag(bookmark, 'h2').textContent).toBe('11/18/2015');
            });
        });
    });
