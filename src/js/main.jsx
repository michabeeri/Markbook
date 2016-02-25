requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        react: '../vendor/react',
        reactDOM: '../vendor/react-dom',
        router: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter'
    },
    map: {
        '*': {
            React: 'react'
        }
    },
    shim: {
        lodash: {
            exports: '_'
        },
        React: {
            exports: 'react'
        },
        reactDom: ['react']
    }
});

requirejs(['lodash', 'react', 'reactDOM', 'components/appView'],
    function (_, React, ReactDOM, AppView) {
        'use strict';

        var items = [
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
        ];

        var mountPoint = document.getElementById('app');
        ReactDOM.render(<AppView items={items}/>, mountPoint);
    }
);
