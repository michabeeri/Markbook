define(['react', 'reactDOM', 'reduxTestUtils', 'components/mainView/mainView'],
    function (React, ReactDOM, ReduxTestUtils, MainView) {
        'use strict';

        xdescribe('Main View', function () {

            var mainView;

            beforeEach(function () {
                mainView = ReduxTestUtils.renderInProvider(MainView);
            });

            it('should render with correct display name', function () {
                expect(mainView.constructor.displayName).toBe('MainView');
            });
        });
    });
