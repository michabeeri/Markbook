requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        react: '../vendor/react',
        reactDOM: '../vendor/react-dom',
        router: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
        redux: '../vendor/redux',
        reactRedux: '../vendor/react-redux',
        uuid: '../vendor/uuid',
        Firebase: '../vendor/firebase'
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


requirejs(['lodash', 'react', 'reactDOM', 'redux', 'reactRedux', 'components/appView', 'reducers/app'],
    function (_, React, ReactDOM, Redux, ReactRedux, AppView, appReducer) {

        'use strict';

        window.addEventListener('resize', _.throttle(function (evt) {
            window.dispatchEvent(new CustomEvent('throttledResize', evt));
        }, 80));
        
        var Provider = ReactRedux.Provider;
        ReactDOM.render(
            <Provider store={Redux.createStore(appReducer, appReducer(), window.devToolsExtension
                ? window.devToolsExtension()
                : undefined)}>

                <AppView />
            </Provider>,
            document.getElementById('app')
        );
    }
);
