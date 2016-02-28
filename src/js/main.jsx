requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        react: '../vendor/react',
        reactDOM: '../vendor/react-dom',
        router: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
        redux: '../vendor/redux',
        reactRedux: '../vendor/react-redux',
        uuid: '../vendor/uuid'
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

requirejs(['react', 'reactDOM', 'redux', 'reactRedux', 'components/appView', 'reducers/user'],
    function (React, ReactDOM, Redux, ReactRedux, AppView, userReducer) {
        'use strict';

        var Provider = ReactRedux.Provider;

        ReactDOM.render(
            <Provider store={Redux.createStore(userReducer)}>
                <AppView />
            </Provider>,
            document.getElementById('app')
        );
    }
);
