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
        var mountPoint = document.getElementById('app');
        ReactDOM.render(<AppView />, mountPoint);
    }
);
