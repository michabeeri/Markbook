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
                        children: ['0001', '0002', '0003', '0004']
                    },
                    {
                        id: '0001',
                        title: 'Fargo Season 2',
                        date: new Date(2015, 10, 18),
                        children: null
                    },
                    {
                        id: '0002',
                        title: 'Fargo Season 1',
                        date: new Date(2014, 11, 10),
                        children: null
                    },
                    {
                        id: '0003',
                        title: 'Bookmark 2 title',
                        date: new Date(2012, 10, 9),
                        children: null
                    },
                    {
                        id: '0004',
                        title: 'Gaspar Noe Movies',
                        date: new Date(2012, 10, 9),
                        children: ['0005', '0006']
                    },
                    {
                        id: '0005',
                        title: 'Machete Kills',
                        date: new Date(2013, 4, 11),
                        children: null
                    },
                    {
                        id: '0006',
                        title: 'Grindhouse',
                        date: new Date(2007, 9, 20),
                        children: null
                    }
                ],
                currentBookmarkPath: [{
                    id: Constants.ROOT_GROUP_ID
                }],
                sort: {
                    sortType: Constants.DEFAULT_SORT_TYPE
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
