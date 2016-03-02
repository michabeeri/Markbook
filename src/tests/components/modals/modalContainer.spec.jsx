//define([ 'React', 'reactDOM', 'components/modals/ModalContainer','components/modals/AddBookmarkModal', 'components/modals/modalData'],
//    function ( React, ReactDOM, ModalContainer, AddBookmarkModal, modalData) {
//        'use strict';
//
//        var TestUtils = React.addons.TestUtils;
//
//        describe('Modal Container', function () {
//
//            function createDemoModalContainer(openedModal)
//            {
//                var callback = jasmine.createSpy('callback');
//                return TestUtils.renderIntoDocument(<ModalContainer openedModal={openedModal} closeModal={callback}
//                                                                    state={{}}/>);
//            }
//
//            it('should have be closed when NONE type is passed', function () {
//                var reactComp = createDemoModalContainer(modalData.eModalType.NONE);
//                expect(TestUtils.scryRenderedDOMComponentsWithClass(reactComp, "modal-opened").length).toBe(0);
//            });
//
//            it('should have only one opened modal', function () {
//                var reactComp = createDemoModalContainer(modalData.eModalType.MODAL_ADD_BOOKMARK);
//                expect(TestUtils.scryRenderedDOMComponentsWithClass(reactComp, "modal-opened").length).toBe(1);
//                //add later others components
//            });
//
//
//        });
//
//    });
