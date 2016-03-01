define(['react', 'reactDOM', 'components/breadcrumbs/breadCrumbs'],
    function (React, ReactDOM, BreadCrumbs) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        xdescribe('Bread Crumbs', function () {

            var breadCrumbs;

            function renderBreadCrumbs(items) {
                breadCrumbs = TestUtils.renderIntoDocument(<BreadCrumbs items={items}/>);
            }

            function getItemElements() {
                return TestUtils.scryRenderedDOMComponentsWithTag(breadCrumbs, 'span');
            }

            it('should render root level correctly', function () {
                renderBreadCrumbs(['All Bookmarks']);
                var root = getItemElements()[0];
                expect(root.innerHTML).toBe('All Bookmarks');
            });

            it('should render two levels correctly', function () {
                renderBreadCrumbs(['All Bookmarks', 'Current Group']);
                var items = getItemElements();
                var root = items[0];
                var current = items[1];

                expect(root.innerHTML).toBe('All Bookmarks');
                expect(current.innerHTML).toBe('Current Group');
            });

            it('should render three levels correctly', function () {
                renderBreadCrumbs(['All Bookmarks', 'Parent Group', 'Current Group']);
                var items = getItemElements();
                var root = items[0];
                var parent = items[1];
                var current = items[2];

                expect(root.innerHTML).toBe('All Bookmarks');
                expect(parent.innerHTML).toBe('Parent Group');
                expect(current.innerHTML).toBe('Current Group');
            });
        });
    });
