define(['react', 'reactDOM', 'components/AppView'],
    function (React, ReactDOM, AppView) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('App View', function () {

            it('should be able to add item', function () {
                var appView = TestUtils.renderIntoDocument(<AppView items={[]}/>);
                var item = {};
                appView.addItem(item);
                expect(appView.state.items).toEqual(jasmine.arrayContaining([item]));
            });
        });
    });
