define(['lodash', 'uuid', 'constants'], function (_, uuid, Constants) {

    'use strict';

    var initialState = [
        {
            id: Constants.ROOT_GROUP_ID,
            title: 'All Bookmarks',
            date: new Date(2015, 10, 18),
            children: ['0001', '0002', '0003', '0004'],
            tags: []
        },
        {
            id: '0001',
            title: 'Fargo Season 2',
            date: new Date(2015, 10, 18),
            children: null,
            url: 'www.tweeter.com',
            tags: []
        },
        {
            id: '0002',
            title: 'Fargo Season 1',
            date: new Date(2014, 11, 10),
            children: null,
            url: 'www.pinterest.com',
            tags: []
        },
        {
            id: '0003',
            title: 'Bookmark 2 title',
            date: new Date(2012, 10, 9),
            children: null,
            url: 'www.facebook.com',
            tags: []
        },
        {
            id: '0004',
            title: 'Gaspar Noe Movies',
            date: new Date(2012, 10, 9),
            children: ['0005', '0006'],
            tags: []
        },
        {
            id: '0005',
            title: 'Machete Kills',
            date: new Date(2013, 4, 11),
            children: null,
            tags: []
        },
        {
            id: '0006',
            title: 'Grindhouse',
            date: new Date(2007, 9, 20),
            children: ['0007'],
            tags: []
        },
        {
            id: '0007',
            title: 'Group 1',
            date: new Date(2007, 9, 20),
            children: ['0008'],
            tags: []
        },
        {
            id: '0008',
            title: 'Group 2',
            date: new Date(2007, 9, 20),
            children: null,
            tags: []
        }
    ];

    return function bookmarks(state, action) {
        if (!state) {
            return initialState;
        }

        switch (action.type) {
            case Constants.ADD_BOOKMARK:
                return (state ? state.slice() : []).concat({
                    id: action.id,
                    title: action.title,
                    date: action.date,
                    url: action.url
                });

            case Constants.EDIT_BOOKMARK:
                // open edit modal
                console.log('edit ' + action.id);
                return state;

            case Constants.TOGGLE_BOOKMARK_SELECTION:
                return _.map(state, function (bm) {
                    if (bm.id === action.id) {
                        return Object.assign({}, bm, {selected: !bm.selected});

                    } else if (!action.isMultiSelect) {
                        return Object.assign({}, bm, {selected: false});

                    }
                    return bm;
                });

            case Constants.REMOVE_BOOKMARK:
                // should implement smarter logic here:
                // delete group if last item removed
                // open modal to ask before deleting group
                return _.reject(state, {id: action.id});

            case Constants.DRAG_REORDER:


            default:
                return state;
        }
    };
});


































