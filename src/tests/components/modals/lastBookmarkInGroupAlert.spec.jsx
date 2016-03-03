define(['React', 'reactDOM', 'components/modals/LastItemAlert', 'constants'],
    function (React, ReactDOM, LastItemAlert, constants) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Last Bookmark in Group Alert', function () {

            function createDemoLastItemAlert() {
                var dispatchSpy = jasmine.createSpy('dispatch');
                var closeSpy = jasmine.createSpy('closeSpy');
                var state = {modals: {type: constants.eModalType.LAST_BOOKMARK_IN_GROUP_ALERT, id: ''}};
                return TestUtils.renderIntoDocument(<LastItemAlert dispatch={dispatchSpy}
                                                                  state={state}
                                                                  close={closeSpy}/>);
            }

            it('should call dispatch on Delete click', function () {
                var reactComp = createDemoLastItemAlert();
                var domNode = ReactDOM.findDOMNode(reactComp);
                var deleteButton = domNode.querySelector('#lastBookmarkDelete');
                TestUtils.Simulate.click(deleteButton);
                expect(reactComp.props.dispatch).toHaveBeenCalled();
            });


            it('should close the call close callback on cancel and keep the bookmarks untouched', function () {
                var reactComp = createDemoLastItemAlert();
                var domNode = ReactDOM.findDOMNode(reactComp);
                var cancelButton = domNode.querySelector('#lastBookmarkCancelDelete');
                TestUtils.Simulate.click(cancelButton);
                expect(reactComp.props.close).toHaveBeenCalled();
                expect(reactComp.props.dispatch).not.toHaveBeenCalled();
            });

        });
    });
