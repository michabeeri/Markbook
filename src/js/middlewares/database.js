define(['lodash', 'constants', 'actionProviders/actions', 'dataBaseApi/dataBaseApi'], function (_, Constants, ActionProvider, DataBaseApi) {

    'use strict';

    function createBookmark(bm) {
        return Object.assign({}, bm, {
            date: new Date(bm.date.year, bm.date.month, bm.date.day),
            children: _.values(bm.children),
            tags: bm.tags ? _.values(bm.tags) : []
        });
    }

    return function database(store) {
        return function (next) {
            return function (action) {

                var state;
                switch (action.type) {

                    case Constants.LOAD_DATA:
                        state = store.getState();
                        next(Object.assign(action, {incomplete: true}));
                        DataBaseApi.readUserData(state.userInfo.uid, function (data) {
                            store.dispatch(ActionProvider.storeData(

                                (data && data.bookmarks)
                                    ? _.values(data.bookmarks).map(createBookmark)
                                    : [{
                                        id: Constants.ROOT_GROUP_ID,
                                        title: 'All Bookmarks',
                                        date: new Date(2015, 10, 18),
                                        children: [],
                                        tags: []
                                    }],

                                (data && data.sort)
                                    ? data.sort
                                    : {sortType: Constants.DEFAULT_SORT_TYPE}));
                        });

                        return ActionProvider.nop();

                    case Constants.STORE_DATA:
                        next(Object.assign(action, {incomplete: true}));
                        store.dispatch(ActionProvider.turnOnFlag(Constants.BOOKMARKS_LOADED));
                        return ActionProvider.nop();


                    case Constants.UPDATE_DATABASE:
                        state = store.getState();
                        DataBaseApi.writeUserData(state.userInfo.uid, {
                            bookmarks: state.bookmarks.map(function (bm) {
                                delete bm.selected;
                                return Object.assign({}, bm, {
                                    date: {
                                        year: bm.date.getFullYear(),
                                        month: bm.date.getMonth(),
                                        day: bm.date.getDay()
                                    },
                                    tags: bm.tags
                                        ? _.values(bm.tags)
                                        : []
                                });
                            }),
                            sort: state.sort
                        });
                        return next(action);


                    case Constants.ADD_BOOKMARK_AND_GROUP:
                    case Constants.ADD_BOOKMARK:
                    case Constants.EDIT_BOOKMARK:
                    case Constants.EDIT_BOOKMARK_AND_CREATE_GROUP:
                    case Constants.REMOVE_BOOKMARK:
                    case Constants.REMOVE_REPARENT_CHILDREN:
                    case Constants.DRAG_REORDER:
                        var updateAction = ActionProvider.updateDatabase();
                        if (action.incomplete) {
                            Object.assign(updateAction, {incomplete: true});
                        }

                        next(Object.assign(action, {incomplete: true}));
                        store.dispatch(updateAction);
                        return ActionProvider.nop();


                    default:
                        return next(action);
                }
            };
        };
    };
});
