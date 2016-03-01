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
                        title: 'Fargo Season 2',
                        date: new Date(2015, 10, 18),
                        children: null

                    },
                    {
                        title: 'Fargo Season 1',
                        date: new Date(2014, 11, 10),
                        children: null
                    },
                    {
                        title: 'Bookmark 2 title',
                        date: new Date(2012, 10, 9),
                        children: null
                    },
                    {
                        title: 'Gaspar Noe Movies',
                        date: new Date(2012, 10, 9),
                        children: Array(4).fill({})
                    }
                ],
                currentBookmarkPath: [{
                    id: Constants.ROOT_GROUP_ID
                }]
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
