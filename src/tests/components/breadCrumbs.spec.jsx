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

            it('should render two levels correctly', function () {
                var breadCrumbs = TestUtils.renderIntoDocument(<BreadCrumbs items={['All Bookmarks', 'Current Group']}/>);
                var items = TestUtils.scryRenderedDOMComponentsWithTag(breadCrumbs, 'span');
                var root = items[0];
                var current = items[1];

                expect(root.innerHTML).toBe('All Bookmarks');
                expect(current.innerHTML).toBe('Current Group');
            });

            it('should render three levels correctly', function () {
                var breadCrumbs = TestUtils.renderIntoDocument(<BreadCrumbs items={['All Bookmarks', 'Parent Group', 'Current Group']}/>);
                var items = TestUtils.scryRenderedDOMComponentsWithTag(breadCrumbs, 'span');
                var root = items[0];
                var parent = items[1];
                var current = items[2];

                expect(root.innerHTML).toBe('All Bookmarks');
                expect(parent.innerHTML).toBe('Parent Group');
                expect(current.innerHTML).toBe('Current Group');
            });
        });
    });
