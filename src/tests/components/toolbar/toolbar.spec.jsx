define(['react', 'components/toolbar/toolbar', 'constants'],
    function (React, ToolBar, Constants) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('tool bar', function () {

            var toolBar;

            beforeEach(function () {
                toolBar = testUtils.renderIntoDocument(<ToolBar items={[]} sort={{sortType: Constants.DEFAULT_SORT_TYPE}}
                    dispatch={function(){}}/>);
            });

            it('should show a search box with Search placeholder', function () {
                var searchNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'search-box');
                expect(searchNode).toBeTruthy();
                expect(searchNode.placeholder).toEqual('Search');
            });

            it('should show an order by input', function () {
                var orderByNode = testUtils.findRenderedDOMComponentWithClass(toolBar, 'order-by');
                expect(orderByNode).toBeTruthy();
            });
        });

    });























