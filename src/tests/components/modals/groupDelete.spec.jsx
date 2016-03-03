define(['React', 'reactDOM', 'components/modals/ModalGroupDelete', 'constants', 'actionProviders/actions'],
    function (React, ReactDOM, ModalGroupDelete, constants, actions) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Delete Group Alert', function () {

            function createDemoDeleteGroupAlert() {
                var dispatchSpy = jasmine.createSpy('dispatch');
                var closeSpy = jasmine.createSpy('closeSpy');
                var state = {modals: {type: constants.eModalType.LAST_BOOKMARK_IN_GROUP_ALERT, id: '001'}};
                return TestUtils.renderIntoDocument(<ModalGroupDelete dispatch={dispatchSpy}
                                                                   state={state}
                                                                   close={closeSpy}/>);
            }

            it('should call proper dispatch on Reparent click and close', function () {
                var reactComp = createDemoDeleteGroupAlert();
                var domNode = ReactDOM.findDOMNode(reactComp);
                var reparentButton = domNode.querySelector('#reparentChildren');
                TestUtils.Simulate.click(reparentButton);
                expect(reactComp.props.dispatch).toHaveBeenCalled();
                expect(reactComp.props.close).toHaveBeenCalled();
            });


            it('should call proper dispatch on Delete All click and close ', function () {
                var reactComp = createDemoDeleteGroupAlert();
                var domNode = ReactDOM.findDOMNode(reactComp);
                var deleteAllButton = domNode.querySelector('#deleteAll');
                TestUtils.Simulate.click(deleteAllButton);
                expect(reactComp.props.close).toHaveBeenCalled();
                expect(reactComp.props.dispatch).toHaveBeenCalled();
            });

        });
    });
