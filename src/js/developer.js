define(['constants', 'dataBaseApi/dataBaseApi', 'actionProviders/actions'], function (Constants, DatabaseApi, ActionProvider) {
    'use strict';

    var resetState = {
        bookmarks: [
            {
                id: Constants.ROOT_GROUP_ID,
                title: 'All Bookmarks',
                date: {year: 2015, month: 10, day: 18},
                children: ['bm0001', 'bm0002', 'bm0003', 'bm0004'],
                tags: []
            },
            {
                id: 'bm0001',
                title: 'Fargo Season 2',
                date: {year: 2015, month: 10, day: 18},
                children: null,
                url: 'www.tweeter.com',
                tags: ['fargo', 'season2']
            },
            {
                id: 'bm0002',
                title: 'Fargo Season 1',
                date: {year: 2014, month: 11, day: 10},
                children: null,
                url: 'www.pinterest.com',
                tags: ['fargo', 'season1']
            },
            {
                id: 'bm0003',
                title: 'Bookmark 2 title',
                date: {year: 2012, month: 10, day: 9},
                children: null,
                url: 'www.facebook.com',
                tags: []
            },
            {
                id: 'bm0004',
                title: 'Gaspar Noe Movies',
                date: {year: 2012, month: 10, day: 9},
                children: ['bm0005', 'bm0006'],
                tags: []
            },
            {
                id: 'bm0005',
                title: 'Machete Kills',
                date: {year: 2013, month: 4, day: 11},
                children: null,
                tags: []
            },
            {
                id: 'bm0006',
                title: 'Grindhouse',
                date: {year: 2007, month: 9, day: 20},
                children: ['bm0007'],
                tags: ['Grindhouse']
            },
            {
                id: 'bm0007',
                title: 'Group 1',
                date: {year: 2007, month: 9, day: 20},
                children: ['bm0008'],
                tags: ['Group1']
            },
            {
                id: 'bm0008',
                title: 'Group 2',
                date: {year: 2007, month: 9, day: 20},
                children: ['bm0009'],
                tags: []
            },
            {
                id: 'bm0009',
                title: 'Group 3',
                date: {year: 2007, month: 9, day: 20},
                children: null,
                tags: ['Group2']
            }
        ],
        sort: {
            sortType: Constants.DEFAULT_SORT_TYPE
        }
    };

    function createBookmark(bm) {
        return Object.assign({}, bm, {
            date: new Date(bm.date.year, bm.date.month, bm.date.day),
            children: _.values(bm.children)
        });
    }

    window.DEVELOPER = {
        resetFirebase: function () {
            DatabaseApi.writeUserData(window.DEVELOPER.store.getState().userInfo.uid, resetState);
            window.DEVELOPER.store.dispatch(ActionProvider.storeData(resetState.bookmarks.map(createBookmark), resetState.sort));
        },
        setStore: function (store) {
            window.DEVELOPER.store = store;
        }
    };

    return window.DEVELOPER;
});
