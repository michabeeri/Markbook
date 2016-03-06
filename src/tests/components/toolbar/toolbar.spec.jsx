define(['react', 'components/toolbar/toolbar', 'constants', 'utils/bookmarksUtil'],
    function (React, ToolBar, Constants, BookmarksUtil) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('tool bar', function () {

            var toolBar;

            function renderToolBar (items, isAllSelected) {
                spyOn(BookmarksUtil, 'getItemsByGroupId').and.returnValue(items);
                spyOn(BookmarksUtil, 'getTotalSelectedBookmarks').and.returnValue(isAllSelected ? items.length : 0);
                return testUtils.renderIntoDocument(<ToolBar items={items}
                                                                sort={{sortType: Constants.DEFAULT_SORT_TYPE}}
                                                                dispatch={function(){}}/>);
            }

            it('should show a search box with Search placeholder', function () {
                toolBar = renderToolBar([] ,true);

                var searchNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'search-box');

                expect(searchNode).toBeTruthy();
                expect(searchNode.placeholder).toEqual('Search');
            });

            it('should show an order by input', function () {
                toolBar = renderToolBar([], true);

                var orderByNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'order-by');

                expect(orderByNode).toBeTruthy();
            });

            it('should show deselect all when all bookmarks are selected', function () {
                toolBar = renderToolBar([{id: '1'}], true);

                var selectDeselectAllNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'select-deselect-all');

                expect(selectDeselectAllNode.innerHTML).toEqual('Deselect All');
            });

            it('should show select all when not all selected', function () {
                toolBar = renderToolBar([{id: '1'}], false);

                var selectDeselectAllNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'select-deselect-all');

                expect(selectDeselectAllNode.innerHTML).toEqual('Select All');
            });
        });

    });























