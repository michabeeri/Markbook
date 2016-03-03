define(['lodash', 'react', 'components/toolbar/orderBy', 'constants'],
    function (_, React, OrderBy, Constants) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('order by', function () {

            var orderBy;
            var sortType = Constants.sortTypes.DATE_DESC.value;
            var setSortType = jasmine.createSpy('setSortType');
            var sortTypes = Constants.sortTypes;

            beforeEach(function () {
                orderBy = testUtils.renderIntoDocument(<OrderBy setSortType={setSortType} sortTypes={sortTypes} selectedSortType={sortType}/>);

            });

            it ('should select the selectedSortType by default', function () {
                var reaorderSelecetNode = testUtils.findRenderedDOMComponentWithClass(orderBy, 'order-by');

                expect(reaorderSelecetNode.value).toEqual(Constants.sortTypes.DATE_DESC.value);
            });

            it ('should call setSortType with the sortType', function () {
                var reaorderSelecetNode = testUtils.findRenderedDOMComponentWithClass(orderBy, 'order-by');

                reaorderSelecetNode.value = Constants.sortTypes.TYPE.value;
                testUtils.Simulate.change(reaorderSelecetNode);

                expect(setSortType).toHaveBeenCalledWith(Constants.sortTypes.TYPE.value);
            });

            it ('should create option for each sort type', function () {
                var reaorderSelecetNode = testUtils.findRenderedDOMComponentWithClass(orderBy, 'order-by');

                var selectNodes = reaorderSelecetNode.children;

                var selectNodesValues = _.map(selectNodes, 'value');
                var sortTypesValues = _.map(sortTypes, 'value');
                expect(selectNodesValues).toEqual(sortTypesValues);
            });

        });

    });
