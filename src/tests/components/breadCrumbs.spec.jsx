define(['react', 'reactDOM', 'components/breadcrumbs/breadCrumbs'],
    function (React, ReactDOM, BreadCrumbs) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Bread Crumbs', function () {

            it('should render root level correctly', function () {
                var breadCrumbs = TestUtils.renderIntoDocument(<BreadCrumbs items={['All Bookmarks']}/>);
                var root = TestUtils.scryRenderedDOMComponentsWithTag(breadCrumbs, 'span')[0];
                expect(root.innerHTML).toBe('All Bookmarks');
            });
        });
    });
