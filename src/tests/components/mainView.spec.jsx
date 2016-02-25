define(['react', 'reactDOM', 'components/mainView/mainView', 'components/bookmarkList/bookmarkList'],
    function (React, ReactDOM, MainView, BookmarkList) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Main View', function () {

            var mainView,
                bookmarkListItemsData;

            beforeEach(function () {
                bookmarkListItemsData = [];
                mainView = TestUtils.renderIntoDocument(<MainView items={bookmarkListItemsData}/>);
            });

            it('should propogate items state to BookmarkList', function () {
                expect(TestUtils.findRenderedComponentWithType(mainView, BookmarkList).props.items).toBe(bookmarkListItemsData);
            });
        });
    });
