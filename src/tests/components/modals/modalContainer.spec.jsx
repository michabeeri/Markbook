define([ 'React', 'reactDOM', 'components/modals/ModalContainer','constants'],
    function ( React, ReactDOM, ModalContainer, constants) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Modal Container', function () {

            function createDemoModalContainer(type) {
                var state = (type === constants.eModalType.NONE) ? {modals: null}: {modals: {type: type}};

                var callback = jasmine.createSpy('callback');
                return TestUtils.renderIntoDocument(<ModalContainer dispatch={callback}
                                                                    state={state}/>);
            }

            it('should have be closed when NONE type is passed', function () {
                var reactComp = createDemoModalContainer(constants.eModalType.NONE);
                expect(TestUtils.scryRenderedDOMComponentsWithClass(reactComp, "modal-opened").length).toBe(0);
            });

            it('should have only one opened modal', function () {
                var reactComp = createDemoModalContainer(constants.eModalType.MODAL_ADD_BOOKMARK);
                expect(TestUtils.scryRenderedDOMComponentsWithClass(reactComp, "modal-opened").length).toBe(1);
                //add later others components
            });

        });
    });
