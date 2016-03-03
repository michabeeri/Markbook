requirejs.config({
    paths: {
        lodash: '../vendor/lodash',
        react: '../vendor/react',
        reactDOM: '../vendor/react-dom',
        router: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
        redux: '../vendor/redux',
        reactRedux: '../vendor/react-redux',
        uuid: '../vendor/uuid',
        Firebase: '../vendor/firebase',
        ReduxSimpleRouter: '../vendor/redux-simple-router'
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



requirejs([
    'lodash',
    'react',
    'reactDOM',
    'redux',
    'router',
    'reactRedux',
    'components/appView',
    'reducers/app',
    'ReduxSimpleRouter',
    'components/loginManager/login',
    'components/loginManager/signup',
    'middlewares/thunk',
    'middlewares/removeBookmark',
    'middlewares/database',
    'developer'],
    function (_, React, ReactDOM, Redux, ReactRouter, ReactRedux, AppView, appReducer, ReduxSimpleRouter, LoginComp, SignupComp, thunkMiddleware, removeBookmarkMiddleware, databaseMiddleware, Developer) {

        'use strict';

        window.addEventListener('resize', _.throttle(function (evt) {
            window.dispatchEvent(new CustomEvent('throttledResize', evt));
        }, 80));

        var Router = ReactRouter.Router;
        var Route = ReactRouter.Route;
        var Provider = ReactRedux.Provider;
        var reduxMiddleware = ReduxSimpleRouter.syncHistory(ReactRouter.browserHistory);
        var createStoreWithMiddleware = Redux.applyMiddleware(reduxMiddleware, thunkMiddleware, removeBookmarkMiddleware, databaseMiddleware)(Redux.createStore);
        var store = createStoreWithMiddleware(appReducer, window.devToolsExtension
            ? window.devToolsExtension()
            : undefined);

        reduxMiddleware.listenForReplays(store, function (state) {return state.routing; });

        Developer.setStore(store);

        ReactDOM.render(
            <Provider store={store}>
                <Router history={ReactRouter.browserHistory}>
                    <Route path="/" component={LoginComp} />
                    <Route path="/login" component={LoginComp} />
                    <Route path="/signup" component={SignupComp} />
                    <Route path="/appView" component={AppView} />
                </Router>
            </Provider>,
            document.getElementById('app')
        );
    }
);
