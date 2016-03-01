var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        console.log(file);
        tests.push(file);
    }
}

requirejs.config({
    baseUrl: '/base/build',
    paths: {
        lodash: 'vendor/lodash',
        react: 'vendor/react',
        reactDOM: 'vendor/react-dom',
        redux: 'vendor/redux',
        reactRedux: 'vendor/react-redux',
        uuid: 'vendor/uuid',
        md5: 'vendor/md5',
        Firebase: 'vendor/firebase',
        router: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
        components: 'js/components',
        mixins: 'js/mixins',
        constants: 'js/constants',
        reducers: 'js/reducers',
        actionProviders: 'js/actionProviders',
        reduxTestUtils: 'tests/components/reduxTestUtils',
        reduxUtils: 'js/reduxUtils'
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
        Firebase: {
            exports: 'Firebase'
        },
        React: {
            exports: 'react'
        },
        reactDom: ['react']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
