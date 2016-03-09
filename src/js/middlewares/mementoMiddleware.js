define(['lodash', 'constants', 'actionProviders/actions'], function (_, Constants, ActionProvider) {

    'use strict';

    var states = [];
    var batchActions = [];
    var openModal = false;

    return function memento(store) {
        return function (next) {
            return function (action) {

                switch (action.type) {

                    case Constants.UNDO:
                        if (states.length > 1) {
                            states.pop();
                            store.dispatch(ActionProvider.set(_.last(states)));
                        }
                        return next(action);

                    case Constants.LOAD_DATA:
                    case Constants.STORE_DATA:
                    case Constants.UPDATE_DATABASE:
                    case Constants.ADD_BOOKMARK:
                    case Constants.ADD_BOOKMARK_AND_GROUP:
                    case Constants.OPEN_BOOKMARK_GROUP:
                    case Constants.EDIT_BOOKMARK:
                    case Constants.EDIT_BOOKMARK_AND_CREATE_GROUP:
                    case Constants.TOGGLE_BOOKMARK_SELECTION:
                    case Constants.REMOVE_BOOKMARK:
                    case Constants.REMOVE_REPARENT_CHILDREN:
                    case Constants.NAVIGATE_TO_PREVIOUS_GROUP:
                    case Constants.DRAG_REORDER_INIT:
                    case Constants.DRAG_REORDER:
                    case Constants.SET_FILTER:
                    case Constants.ADD_FLAG:
                    case Constants.REMOVE_FLAG:
                    case Constants.OPEN_MODAL:
                    case Constants.CLOSE_MODAL:
                    //case Constants.SELECT_DESELECT_ALL:
                        next(action);
                        batchActions.push(action);

                        if (action.type === Constants.LOAD_DATA) {
                            states = [];
                        }

                        if (action.type === Constants.OPEN_MODAL) {
                            openModal = true;
                        }

                        if (action.type === Constants.CLOSE_MODAL) {
                            openModal = false;
                        }

                        if (!action.incomplete && !openModal) {
                            states.push(_.cloneDeep(store.getState()));
                            console.log('{ ' + batchActions.map(function (a) {return a.type; }).join(', ') + ' }');
                            batchActions = [];
                        }

                        return ActionProvider.nop();

                    default:
                        return next(action);
                }
            };
        };
    };
});
