define(['lodash',
        'constants',
        'actionProviders/actions',
        'reducers/currentBookmarkPath'],
    function (_, Constants, ActionProvider, currentBookmarkPath) {
        'use strict';

        describe('Current bookmark path reducer', function () {

            it('should navigate to previous group', function () {
                var PARENT_GROUP_ID = 'parentGroupId';
                var CURRENT_GROUP_ID = 'currentGroupId';

                var initialState = [Constants.ROOT_GROUP_ID, PARENT_GROUP_ID, CURRENT_GROUP_ID];
                var action = ActionProvider.navigateToPreviousGroup(PARENT_GROUP_ID);
                var newState = currentBookmarkPath(initialState, action);
                expect(newState).toEqual([Constants.ROOT_GROUP_ID, PARENT_GROUP_ID]);
            });

            it('should add new bookmark to path on open bookmark group', function () {
                var PARENT_GROUP_ID = 'parentGroupId';
                var NEW_GROUP_ID = 'newGroupId';

                var initialState = [Constants.ROOT_GROUP_ID, PARENT_GROUP_ID];
                var action = ActionProvider.openBookmarkGroup(NEW_GROUP_ID);
                var newState = currentBookmarkPath(initialState, action);
                expect(newState).toEqual([Constants.ROOT_GROUP_ID, PARENT_GROUP_ID, NEW_GROUP_ID]);
            });
        });
    });
