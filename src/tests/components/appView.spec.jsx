
define(['react', 'reactDOM', 'reduxTestUtils', 'components/appView-rdx'],
    function (React, ReactDOM, ReduxTestUtils, AppView) {

        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('App View', function () {

            var appView;

            beforeEach(function () {

                appView = ReduxTestUtils.renderInProvider(AppView);

            });

            it('should render the topbar component', function () {
                expect(function () {
                    TestUtils.findRenderedDOMComponentWithClass(appView, 'top-bar');
                }).not.toThrowError();
            });

        });
    });
