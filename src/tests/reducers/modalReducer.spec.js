define(['lodash', 'reducers/modalReducer', 'actionProviders/actions', 'constants'],
    function (_, modalReducer, actions, constants) {
        'use strict';

        describe('Modal reducer', function () {

            it('should open bookmark data modal', function () {
                var initialState = null;
                var action = actions.openBookmarkDataModal();
                var newState = modalReducer(initialState, action);
                expect(newState).toEqual({type: constants.eModalType.MODAL_ADD_BOOKMARK});
            });


            it('should open delete group modal', function () {
                var initialState = null;
                var action = actions.openDeleteGroupModal();
                var newState = modalReducer(initialState, action);
                expect(newState).toEqual({type: constants.eModalType.GROUP_DELETE_NOTIFICATION});
            });


            it('should open delete last item in group modal', function () {
                var initialState = null;
                var action = actions.openLastItemInGroupDelete();
                var newState = modalReducer(initialState, action);
                expect(newState).toEqual({type: constants.eModalType.LAST_BOOKMARK_IN_GROUP_ALERT});
            });

            it('should have initial state of null', function () {
                var newState = modalReducer();
                expect(newState).toEqual(null);
            });

            it('should close modal', function () {
                var initialState = {type: constants.eModalType.MODAL_ADD_BOOKMARK};
                var action = actions.closeModal();
                var newState = modalReducer(initialState, action);
                expect(newState).toEqual(null);
            });


        });
    });
