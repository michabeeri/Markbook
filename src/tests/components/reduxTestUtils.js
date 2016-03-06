define(['react', 'reactDOM', 'redux', 'reactRedux', 'constants'],
    function (React, ReactDOM, Redux, ReactRedux, Constants) {

        'use strict';

        var TestUtils = React.addons.TestUtils;
        var Provider = ReactRedux.Provider;

        function getInitialState() {
            return {
                userInfo: {
                    username: 'user@wix.com'
                },
                bookmarks: [
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
                        tags: ['fargo', 'season2']
                    },
                    {
                        id: '0002',
                        title: 'Fargo Season 1',
                        date: new Date(2014, 11, 10),
                        children: null,
                        url: 'www.pinterest.com',
                        tags: ['fargo', 'season1']
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
                        tags: ['Grindhouse']
                    },
                    {
                        id: '0007',
                        title: 'Group 1',
                        date: new Date(2007, 9, 20),
                        children: ['0008'],
                        tags: ['Group1']
                    },
                    {
                        id: '0008',
                        title: 'Group 2',
                        date: new Date(2007, 9, 20),
                        children: ['0009'],
                        tags: []
                    },
                    {
                        id: '0009',
                        title: 'Group 3',
                        date: new Date(2007, 9, 20),
                        children: null,
                        tags: ['Group2']
                    }
                ],
                currentBookmarkPath: [
                    Constants.ROOT_GROUP_ID
                ],
                sort: {
                    sortType: Constants.DEFAULT_SORT_TYPE
                },
                layout: {
                    layoutType: Constants.layoutType.GRID
                }
            };
        }

        function renderInProvider(component, reducer) {
            return TestUtils.findRenderedComponentWithType(TestUtils.renderIntoDocument(React.createElement(
                Provider,
                {store: Redux.createStore(reducer || getInitialState)},
                React.createElement(component, null)
            )), component);
        }

        return {
            getInitialState: getInitialState,
            renderInProvider: renderInProvider
        };
    });
