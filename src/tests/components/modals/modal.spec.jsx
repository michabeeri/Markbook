define([ 'React', 'reactDOM', 'components/modals/Modal'],
    function ( React, ReactDOM, Modal) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Modal', function () {

            var modalOwnerMock = {
                closeCallback: function() { }
            };

            beforeEach(function() {
                spyOn(modalOwnerMock, 'closeCallback');
            });

            it('should open a modal', function () {
                var constructor = TestUtils.renderIntoDocument( <Modal className="modalDialog opened"/>);
                var domNode = ReactDOM.findDOMNode(constructor);
                expect([].slice.apply(domNode.classList)).toEqual(["modalDialog", "opened"]);
            });

            it('should close a modal', function () {
                var constructor = TestUtils.renderIntoDocument( <Modal className="modalDialog closed"/>);
                var domNode = ReactDOM.findDOMNode(constructor);
                expect([].slice.apply(domNode.classList)).toEqual(["modalDialog", "closed"]);
            });

            it('should call close callback when close X is clicked', function () {
                var constructor = TestUtils.renderIntoDocument( <Modal className="modalDialog opened" onClose={modalOwnerMock.closeCallback}/>);
                var domNode = ReactDOM.findDOMNode(constructor);
                var closingElement = domNode.querySelector('#modalCloser');
                TestUtils.Simulate.click(closingElement);
                expect(modalOwnerMock.closeCallback).toHaveBeenCalled();
            });
        });

    });
