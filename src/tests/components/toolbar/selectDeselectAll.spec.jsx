define(['lodash', 'react', 'components/toolbar/actionControls', 'constants'],
    function (_, React, ActionControls, Constants) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('Select Deselect All', function () {

            var onSelectDeselectAll, actionControls;

            function renderActionControls(isAllSelected) {
                onSelectDeselectAll = jasmine.createSpy('onSelectDeselectAll');
                return testUtils.renderIntoDocument(<ActionControls isAllSelected={isAllSelected} onSelectDeselectAll={onSelectDeselectAll}/>);
            }

            it('should show deselect all when isAllSelected equals true', function () {
                actionControls = renderActionControls(true);

                var slctDeslctAll = testUtils.findRenderedDOMComponentWithClass(actionControls, 'select-deselect-all');

                expect(slctDeslctAll.innerHTML).toEqual('Deselect All');
            });

            it('should show select all when isAllSelected equals false', function () {
                actionControls = renderActionControls(false);

                var slctDeslctAll = testUtils.findRenderedDOMComponentWithClass(actionControls, 'select-deselect-all');

                expect(slctDeslctAll.innerHTML).toEqual('Select All');
            });

            it('should add hidden class when the layout is LIST', function () {
                actionControls = testUtils.renderIntoDocument(<ActionControls layoutType={Constants.layoutType.LIST}/>);

                var slctDeslctAll = testUtils.findRenderedDOMComponentWithClass(actionControls, 'select-deselect-all');

                expect(slctDeslctAll.classList).toContain('hidden');

            });
        });

    });
