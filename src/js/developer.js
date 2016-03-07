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
                url: 'http://www.imdb.com/title/tt2802850/episodes?season=2&ref_=ttep_ep_sn_nx',
                tags: ['fargo', 'season2']
            },
            {
                id: 'bm0002',
                title: 'Fargo Season 1',
                date: {year: 2014, month: 11, day: 10},
                children: null,
                url: 'http://www.imdb.com/title/tt2802850/episodes?season=1&ref_=ttep_ep_sn_pv',
                tags: ['fargo', 'season1']
            },
            {
                id: 'bm0003',
                title: 'The Hottie & the Nottie',
                date: {year: 2008, month: 1, day: 21},
                children: null,
                url: 'http://www.imdb.com/title/tt0804492',
                tags: []
            },
            {
                id: 'bm0004',
                title: 'Best Movies Ever !!!',
                date: {year: 2012, month: 10, day: 9},
                children: ['bm0005', 'bm0006', 'bm0012'],
                tags: []
            },
            {
                id: 'bm0005',
                title: 'Machete Kills',
                date: {year: 2013, month: 4, day: 11},
                children: null,
                url: 'http://www.imdb.com/title/tt2002718',
                tags: []
            },
            {
                id: 'bm0006',
                title: 'The Twilight Saga',
                date: {year: 2007, month: 9, day: 20},
                children: ['bm0007', 'bm0008', 'bm0009', 'bm0010', 'bm0011'],
                tags: ['Twilight', 'vampires']
            },
            {
                id: 'bm0007',
                title: 'Twilight',
                date: {year: 2007, month: 9, day: 10},
                children: null,
                url: 'http://www.imdb.com/title/tt1099212/',
                tags: ['Twilight', 'vampires']
            },
            {
                id: 'bm0008',
                title: 'New Moon',
                date: {year: 2009, month: 10, day: 20},
                children: null,
                url: 'http://www.imdb.com/title/tt1259571/?ref_=tt_rec_tt',
                tags: ['Twilight', 'vampires']
            },
            {
                id: 'bm0009',
                title: 'Eclipse',
                date: {year: 2010, month: 5, day: 30},
                children: null,
                url: 'http://www.imdb.com/title/tt1325004/?ref_=tt_rec_tt',
                tags: ['Twilight', 'vampires']
            },
            {
                id: 'bm0010',
                title: 'Breaking Dawn - Part 1',
                date: {year: 2011, month: 10, day: 18},
                children: null,
                url: 'http://www.imdb.com/title/tt1324999/?ref_=tt_rec_tt',
                tags: ['Twilight', 'vampires']
            },
            {
                id: 'bm0011',
                title: 'Breaking Dawn - Part 2',
                date: {year: 2012, month: 10, day: 16},
                children: null,
                url: 'http://www.imdb.com/title/tt1673434/?ref_=tt_rec_tt',
                tags: ['Twilight', 'vampires']
            },
            {
                id: 'bm0012',
                title: 'Legally Blonde 2: Red, White & Blonde',
                date: {year: 2007, month: 9, day: 20},
                children: null,
                url: 'http://www.imdb.com/title/tt0333780',
                tags: ['Blondness', 'Chiwawa']
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

    // Password: Qwerty1

    window.DEVELOPER = {
        //username: 'tester@wix.com',
        //uid: 'b3bd1505-a6e9-4af1-98a0-5408a5ad12b7',

        //username: 'yaela@wix.com',
        //uid: 'eb5baf59-9d4c-4792-bff0-a85e0e255f9e',

        //username: 'naamaa@wix.com',
        //uid: '9b17bc9f-ba17-4dc3-9b68-46aef52422a9',

        //username: 'reutsa@wix.com',
        //uid: 'fa8fa7b9-1939-43c2-b9cc-b68ad60d483f',

        //username: 'odedg@wix.com',
        //uid: '3b9f234c-b3e0-4eb8-bd33-b816c6d217d7',

        //username: 'vladale@wix.com',
        //uid: 'e7d1c265-4a36-49a3-825a-389c3278cce6',

        //username: 'michaelb@wix.com',
        //uid: 'db3af885-f95a-4793-9481-91f2c57e1749',

        resetFirebase: function () {
            DatabaseApi.writeUserData(window.DEVELOPER.uid, resetState);
            window.DEVELOPER.store.dispatch(ActionProvider.storeData(resetState.bookmarks.map(createBookmark), resetState.sort));
        },
        setStore: function (store) {
            window.DEVELOPER.store = store;
        }
    };

    return window.DEVELOPER;
});
