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

                        return next(action);

                    case Constants.UPDATE_DATABASE:
                        state = store.getState();
                        DataBaseApi.writeUserData(state.userInfo.uid, {
                            bookmarks: state.bookmarks.map(function (bm) {
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


                    default:
                        return next(action);
                }
            };
        };
    };
});
