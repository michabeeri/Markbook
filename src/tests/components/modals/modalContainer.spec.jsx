define([ 'React', 'reactDOM', 'components/modals/ModalContainer','components/modals/AddBookmarkModal', 'constants'],
    function ( React, ReactDOM, ModalContainer, AddBookmarkModal, constants) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Modal Container', function () {

            function createDemoModalContainer(openedModal)
            {
                var callback = jasmine.createSpy('callback');
                return TestUtils.renderIntoDocument( <ModalContainer openedModal={openedModal} closeModal={callback}/>);
            }

            it('should have be closed when NONE type is passed', function () {
                var reactComp = createDemoModalContainer(constants.eModalType.NONE);
                expect(TestUtils.scryRenderedDOMComponentsWithClass(reactComp, "opened").length).toBe(0);
            });

            it('should have only one opened modal', function () {
                var reactComp = createDemoModalContainer(constants.eModalType.MODAL_ADD_BOOKMARK);
                expect(TestUtils.scryRenderedDOMComponentsWithClass(reactComp, "opened").length).toBe(1);
                //add later others components
            });


        });

    });
