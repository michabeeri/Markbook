define(['react', 'reactDOM', 'components/appView', 'components/mainView/mainView'],
    function (React, ReactDOM, AppView, MainView) {

        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('App View', function () {

            var appView,
                bookmarkListItemsData;

            beforeEach(function () {
                bookmarkListItemsData = [];
                appView = TestUtils.renderIntoDocument(<AppView items={bookmarkListItemsData}/>);
            });

            it('should render with correct display name', function () {
                expect(appView.constructor.displayName).toBe('AppView');
            });

            it('should render the topbar component', function () {
                expect(function () {
                    TestUtils.findRenderedDOMComponentWithClass(appView, 'top-bar');
                }).not.toThrowError();
            });

            it('should be able to add item', function () {
                var itemData = {};
                appView.addItem(itemData);
                expect(appView.state.itemData).toEqual(jasmine.arrayContaining([itemData]));
            });

            it('should propogate items state to MainView', function () {
                expect(TestUtils.findRenderedComponentWithType(appView, MainView).props.items).toBe(bookmarkListItemsData);
            });
        });
    });
