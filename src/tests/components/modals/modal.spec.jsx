define([ 'React', 'reactDOM', 'components/modals/Modal'],
    function ( React, ReactDOM, Modal) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Modal', function () {

            var modalOwnerMock = {
                closeCallback: function() { }
            };

            function createDemoModalContainer(className)
            {
                var callback = jasmine.createSpy('callback');
                return TestUtils.renderIntoDocument( <Modal className={className} closeModal={callback}>demo child</Modal>);
            }

            beforeEach(function() {
                spyOn(modalOwnerMock, 'closeCallback');
            });

            it('should open a modal', function () {
                var reactComp = createDemoModalContainer("modalDialog opened");
                var domNode = ReactDOM.findDOMNode(reactComp);
                expect([].slice.apply(domNode.classList)).toEqual(["modalDialog", "opened"]);
            });

            it('should close a modal', function () {
                var reactComp = createDemoModalContainer("modalDialog closed");
                var domNode = ReactDOM.findDOMNode(reactComp);
                expect([].slice.apply(domNode.classList)).toEqual(["modalDialog", "closed"]);
            });

            it('should call close callback when close X is clicked', function () {
                var reactComp = createDemoModalContainer("modalDialog opened");
                var domNode = ReactDOM.findDOMNode(reactComp);
                var closingElement = domNode.querySelector('#modalCloser');
                TestUtils.Simulate.click(closingElement);
                expect(reactComp.props.closeModal).toHaveBeenCalled();
            });
        });

    });
