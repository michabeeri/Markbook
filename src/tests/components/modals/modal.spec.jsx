define(['React', 'reactDOM', 'components/modals/Modal'], function (React, ReactDOM, Modal) {
    'use strict';
    var TestUtils = React.addons.TestUtils;
    describe('Modal', function () {
        var modalOwnerMock = {
            closeCallback: function () {
            }
        };

        function createDemoModalContainer(className) {
            var dispatchSpy = jasmine.createSpy('dispatchSpy');
            var callback = jasmine.createSpy('callback');
            return TestUtils.renderIntoDocument(<Modal className={className} dispatch={dispatchSpy} close={callback}>demo child</Modal>);
        }

        beforeEach(function () {
            spyOn(modalOwnerMock, 'closeCallback');
        });
        it('should open a modal', function () {
            var reactComp = createDemoModalContainer("modal modal-opened");
            var domNode = ReactDOM.findDOMNode(reactComp);
            expect([].slice.apply(domNode.classList)).toEqual(["modal", "modal-opened"]);
        });
        it('should close a modal', function () {
            var reactComp = createDemoModalContainer("modal modal-closed");
            var domNode = ReactDOM.findDOMNode(reactComp);
            expect([].slice.apply(domNode.classList)).toEqual(["modal", "modal-closed"]);
        });
        it('should call close callback when close X is clicked', function () {
            var reactComp = createDemoModalContainer("modal modal-opened");
            var domNode = ReactDOM.findDOMNode(reactComp);
            var closingElement = domNode.querySelector('#modalCloser');
            TestUtils.Simulate.click(closingElement);
            expect(reactComp.props.close).toHaveBeenCalled();
        });
    });
}); 
