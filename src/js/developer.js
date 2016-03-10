define(['constants', 'dataBaseApi/dataBaseApi', 'actionProviders/actions'], function (Constants, DatabaseApi, ActionProvider) {
    'use strict';

    var resetState = {
        bookmarks: [
            {
                id: Constants.ROOT_GROUP_ID,
                title: 'All Bookmarks',
                date: {year: 2015, month: 10, day: 1},
                children: ['1cc2e7d7-a639-43a6-a768-1494ba4ff5e9', 'e40f85c2-70ce-4824-8756-62ebd282fb49', '2da8df66-b15c-4a38-9f58-876bc9fe5efe', 'df46a56f-84a5-4b56-9a20-65b2240676cb', '1495b51a-295b-4b66-a763-10242797a8f9'],
                tags: []
            },
            {
                id: '4d3da068-3cb4-410e-b7df-c7d1579a0a02',
                title: 'aa',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://www.linkedin.com/in/stewie-griffin-206a5590?trk=prof-samename-name',
                tags: []
            },
            {
                id: '1cc2e7d7-a639-43a6-a768-1494ba4ff5e9',
                title: 'Social Networks',
                date: {year: 2016, month: 2, day: 4},
                children: ['2c8c04b7-2b53-4a2f-865f-e18e93abe373, 721078ae-70ef-4a4b-bbd2-0e483e41ea45'],
                tags: []
            },
            {
                id: '721078ae-70ef-4a4b-bbd2-0e483e41ea45',
                title: 'LinkedIn',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://www.linkedin.com/in/stewie-griffin-206a5590?trk=prof-samename-name',
                tags: []
            },
            {
                id: '2c8c04b7-2b53-4a2f-865f-e18e93abe373',
                title: 'Facebook',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://www.facebook.com/StewieGriffinfromFamilyGuy/',
                tags: []
            },
            {
                id: 'df46a56f-84a5-4b56-9a20-65b2240676cb',
                title: 'Kill mom',
                date: {year: 2016, month: 2, day: 4},
                children: ['1c2c2cb2-a41b-48c9-ac7d-6ca757f0fb61', '7381716f-a428-46ee-8a1b-2451a37a40cc'],
                tags: []
            },
            {
                id: '7381716f-a428-46ee-8a1b-2451a37a40cc',
                title: 'Gun shop',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://www.kids-army.com/toy-guns',
                tags: []
            },
            {
                id: '1c2c2cb2-a41b-48c9-ac7d-6ca757f0fb61',
                title: 'Pictures',
                date: {year: 2016, month: 2, day: 4},
                children: ['986556af-a23b-4d69-b665-4d881c092205'],
                tags: []
            },
            {
                id: '986556af-a23b-4d69-b665-4d881c092205',
                title: 'Stealing from Louis',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://pbs.twimg.com/profile_images/2213116534/tumblr_lwzsv9c3OU1r2fzujo1_500_400x400.gif',
                tags: []
            },
            {
                id: 'e40f85c2-70ce-4824-8756-62ebd282fb49',
                title: 'Silk road',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://us.battle.net/d3/en/',
                tags: []
            },
            {
                id: '2da8df66-b15c-4a38-9f58-876bc9fe5efe',
                title: 'Jolly farm',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://familyguy.wikia.com/wiki/Jolly_Farm_Revue',
                tags: []
            },
            {
                id: '1495b51a-295b-4b66-a763-10242797a8f9',
                title: 'Brian\'s hot pictures',
                date: {year: 2016, month: 2, day: 4},
                children: ['bb67f73f-9b60-4a77-9e90-789ff076d5ee'],
                tags: []
            },
            {
                id: 'bb67f73f-9b60-4a77-9e90-789ff076d5ee',
                title: 'Brian is a rapper',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://s-media-cache-ak0.pinimg.com/736x/87/bc/34/87bc344c0990f53cfa89b853f1537b9c.jpg',
                tags: []
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
