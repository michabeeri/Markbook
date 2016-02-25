define(['react', 'reactDOM', 'components/appView'],
    function (React, ReactDOM, AppView) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('App View', function () {

            var appView;

            beforeEach(function () {
                appView = TestUtils.renderIntoDocument(<AppView items={[]}/>);
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
                var item = {};
                appView.addItem(item);
                expect(appView.state.items).toEqual(jasmine.arrayContaining([item]));
            });
        });
    });
