define(['lodash', 'react', 'components/toolbar/actionControls'],
    function (_, React, ActionControls) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('bookmarks search', function () {

            var onSelectDeselectAll, actionControls;

            beforeEach(function () {
                onSelectDeselectAll = jasmine.createSpy('onSelectDeselectAll');
                actionControls = testUtils.renderIntoDocument(<ActionControls onSelectDeselectAll={onSelectDeselectAll}/>);
            });

            it('should switch select all with deselect all on click', function () {
                var slctDeslctAll = testUtils.findRenderedDOMComponentWithClass(actionControls, 'select-deselect-all');
                var initialValue = slctDeslctAll.innerHTML;
                var expectedValueAfterClick = _.xor([initialValue], ['Select All', 'Deselect All'])[0];

                testUtils.Simulate.click(slctDeslctAll);

                expect(slctDeslctAll.innerHTML).toEqual(expectedValueAfterClick);
            });

            it('should call onSelectDeselectAll with the inSelectAllMode', function () {
                var slctDeslctAll = testUtils.findRenderedDOMComponentWithClass(actionControls, 'select-deselect-all');
                var initialValue = slctDeslctAll.innerHTML;
                var inSelectAllMode = initialValue === 'Select All';

                testUtils.Simulate.click(slctDeslctAll);

                expect(onSelectDeselectAll).toHaveBeenCalledWith(inSelectAllMode);
            });
        });

    });
