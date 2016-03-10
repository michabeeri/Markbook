define(['constants', 'dataBaseApi/dataBaseApi', 'actionProviders/actions'], function (Constants, DatabaseApi, ActionProvider) {
    'use strict';

    var resetState = {
        bookmarks: [
            {
                id: Constants.ROOT_GROUP_ID,
                title: 'All Bookmarks',
                date: {year: 2015, month: 10, day: 1},
                children: ['4d3da068-3cb4-410e-b7df-c7d1579a0a02', '2c8c04b7-2b53-4a2f-865f-e18e93abe373', '2da8df66-b15c-4a38-9f58-876bc9fe5efe', 'e40f85c2-70ce-4824-8756-62ebd282fb49', 'df46a56f-84a5-4b56-9a20-65b2240676cb', '74a9f616-47ed-4347-9515-be847588b36b'],
                tags: []
            },
            {
                id: '4d3da068-3cb4-410e-b7df-c7d1579a0a02',
                title: 'Linked-in',
                date: {year: 2013, month: 4, day: 17},
                children: null,
                url: 'https://www.linkedin.com/in/stewie-griffin-206a5590?trk=prof-samename-name',
                tags: []
            },
            {
                id: '2c8c04b7-2b53-4a2f-865f-e18e93abe373',
                title: 'Facebook',
                date: {year: 2008, month: 9, day: 9},
                children: null,
                url: 'https://www.facebook.com/StewieGriffinfromFamilyGuy/',
                tags: []
            },
            {
                id: '2da8df66-b15c-4a38-9f58-876bc9fe5efe',
                title: 'Jolly farm',
                date: {year: 2014, month: 1, day: 2},
                children: null,
                url: 'http://familyguy.wikia.com/wiki/Jolly_Farm_Revue',
                tags: []
            },
            {
                id: 'e40f85c2-70ce-4824-8756-62ebd282fb49',
                title: 'Silk road',
                date: {year: 2013, month: 2, day: 4},
                children: null,
                url: 'http://www.coindesk.com/vault-satoshi-founders-close-bitcoin-exchange-focus-netflix-startup/',
                tags: []
            },
            {
                id: 'df46a56f-84a5-4b56-9a20-65b2240676cb',
                title: 'Killing lois',
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
                tags: ['lois']
            },
            {
                id: '74a9f616-47ed-4347-9515-be847588b36b',
                title: 'Projects',
                date: {year: 2016, month: 2, day: 4},
                children: ['50c3e041-b623-4f76-8619-ddcda8bbdff3', '07ea488d-9981-42e2-b0d8-a984e6784f25', '4af4a7dd-cf48-44b7-9b00-2a3b51317b8d'],
                tags: []
            },
//###########    Mind Control   #######################################################################################
            {
                id: '50c3e041-b623-4f76-8619-ddcda8bbdff3',
                title: 'Mind control',
                date: {year: 2011, month: 6, day: 31},
                children: ['24e64fe6-e873-4132-81e3-66dd1f4b69ba', 'c65839dc-3efe-463c-9cdc-d117e1fd6c91', '0557a3a0-a4d0-4ac5-babb-34fa47a429cf', 'd10d0d98-8ad5-4e26-b249-ee03889d2704', '6e6547e7-f9fa-49e9-85a6-c49ee0edbf8f', 'e2016443-c3c6-415e-9dbd-98874bfe7b17'],
                tags: []
            },
            {
                id: '24e64fe6-e873-4132-81e3-66dd1f4b69ba',
                title: 'reactor maintenance guide',
                date: {year: 2011, month: 8, day: 15},
                children: null,
                url: 'http://www8.hp.com/us/en/retail-solutions/overview.html',
                tags: []
            },
            {
                id: 'c65839dc-3efe-463c-9cdc-d117e1fd6c91',
                title: 'Mini factories production plane',
                date: {year: 2011, month: 4, day: 22},
                children: null,
                url: 'http://www.foxcom.com/products/satcom-solutions',
                tags: []
            },
            {
                id: '0557a3a0-a4d0-4ac5-babb-34fa47a429cf',
                title: 'Heat capacity matrix',
                date: {year: 2011, month: 10, day: 5},
                children: null,
                url: 'http://www.engineering-dictionary.org/H/1/',
                tags: []
            },
            {
                id: 'd10d0d98-8ad5-4e26-b249-ee03889d2704',
                title: 'Magnetic iron oxide (Fe3O2) ionization',
                date: {year: 2011, month: 7, day: 11},
                children: null,
                url: 'https://www.shodor.org/chemviz/ionization/students/background.html',
                tags: []
            },
            {
                id: '6e6547e7-f9fa-49e9-85a6-c49ee0edbf8f',
                title: 'Quantum asset recovery',
                date: {year: 2012, month: 0, day: 27},
                children: null,
                url: 'http://www.dwavesys.com/',
                tags: []
            },
            {
                id: 'e2016443-c3c6-415e-9dbd-98874bfe7b17',
                title: 'The Twilight Saga: Eclipse',
                date: {year: 2016, month: 0, day: 3},
                children: null,
                url: 'http://www.imdb.com/title/tt1325004/',
                tags: []
            },
//############  Time machine  ###################################################################################
            {
                id: '07ea488d-9981-42e2-b0d8-a984e6784f25',
                title: 'Time machine',
                date: {year: 2016, month: 2, day: 4},
                children: ['c38e389b-1e5b-4b7b-8806-37ab317ab893', '9e3eb56d-6d3c-4877-b986-165fd0ea1bc3', '0cdb3f9c-4a7e-48c3-9800-657e69f6934d', '2e63871a-ace8-4eb7-b370-b0d3ddc77999', '8ca2da9c-ccfb-434e-a15c-3195d745d2f4', '0ad40a83-17b2-44a2-9652-028eff1fce71', '06a92ae4-eb76-4906-8930-d092dffa26b4', '3e98ecd5-f173-46e5-b72f-f2b2913eb4cd', 'c3c716f4-2c81-431b-9eaa-f475f876e42d', 'abceeb8a-e91b-4992-b8c4-9d2206c32b97'],
                tags: []
            },
            {
                id: 'c38e389b-1e5b-4b7b-8806-37ab317ab893',
                title: 'Time machine specs',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://github.com/reactjs',
                tags: []
            },
            {
                id: '9e3eb56d-6d3c-4877-b986-165fd0ea1bc3',
                title: 'reactor maintenance guide',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www8.hp.com/us/en/retail-solutions/overview.html',
                tags: []
            },
            {
                id: '0cdb3f9c-4a7e-48c3-9800-657e69f6934d',
                title: 'Mini factories production plane',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www.foxcom.com/products/satcom-solutions',
                tags: []
            },
            {
                id: '2e63871a-ace8-4eb7-b370-b0d3ddc77999',
                title: 'Heat capacity matrix',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www.engineering-dictionary.org/H/1/',
                tags: []
            },
            {
                id: '8ca2da9c-ccfb-434e-a15c-3195d745d2f4',
                title: 'Magnetic iron oxide (Fe3O2) ionization',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'https://www.shodor.org/chemviz/ionization/students/background.html',
                tags: []
            },
            {
                id: '0ad40a83-17b2-44a2-9652-028eff1fce71',
                title: 'Quantum asset recovery',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www.dwavesys.com/',
                tags: []
            },
            {
                id: '06a92ae4-eb76-4906-8930-d092dffa26b4',
                title: 'The Twilight Saga: Eclipse',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www.imdb.com/title/tt1325004/',
                tags: []
            },
            {
                id: '3e98ecd5-f173-46e5-b72f-f2b2913eb4cd',
                title: 'reactor maintenance guide',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www8.hp.com/us/en/retail-solutions/overview.html',
                tags: []
            },
            {
                id: 'c3c716f4-2c81-431b-9eaa-f475f876e42d',
                title: 'Mini factories production plane',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www.foxcom.com/products/satcom-solutions',
                tags: []
            },
            {
                id: 'abceeb8a-e91b-4992-b8c4-9d2206c32b97',
                title: 'Heat capacity matrix',
                date: {year: 2016, month: 2, day: 4},
                children: null,
                url: 'http://www.engineering-dictionary.org/H/1/',
                tags: []
            },
//###############################################################################################
            {
                id: '4af4a7dd-cf48-44b7-9b00-2a3b51317b8d',
                title: 'Doppelganger robot spec',
                date: {year: 2009, month: 8, day: 3},
                children: null,
                url: 'https://moqups.com/',
                tags: ['invention', 'evil']
            }
        ],
        sort: {
            sortType: Constants.DEFAULT_SORT_TYPE
        }
    };

    //http://awesci.com/building-solar-death-ray-at-home/

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
