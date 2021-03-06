/**
 * Created by itaysh on 7/27/15.
 */

'use strict';

module.exports = function (grunt) {
    var historyApiFallbackMiddleware = require('connect-history-api-fallback');
    var VENDOR_TARGET = 'build/vendor/';

    grunt.initConfig({
        clean: {
            main: {
                src: [VENDOR_TARGET + '**/*']
            },
            build: {
                src: 'build/**/*'
            }
        },
        copy: {
            build: {
                files: [
                    {
                        src: 'node_modules/react/dist/react-with-addons.js',
                        dest: VENDOR_TARGET + 'react.js'
                    },
                    {
                        src: 'node_modules/react-dom/dist/react-dom.js',
                        dest: VENDOR_TARGET + 'react-dom.js'
                    },
                    {
                        src: 'node_modules/requirejs/require.js',
                        dest: VENDOR_TARGET + 'require.js'
                    },
                    {
                        src: 'node_modules/lodash/index.js',
                        dest: VENDOR_TARGET + 'lodash.js'
                    },
                    {
                        src: 'node_modules/spin.js/spin.js',
                        dest: VENDOR_TARGET + 'spin.js'
                    },
                    {

                        src: 'node_modules/redux/dist/redux.js',
                        dest: VENDOR_TARGET + 'redux.js'
                    },
                    {
                        src: 'node_modules/react-redux/dist/react-redux.js',
                        dest: VENDOR_TARGET + 'react-redux.js'
                    },
                    {
                        src: 'node_modules/node-uuid/uuid.js',
                        dest: VENDOR_TARGET + 'uuid.js'
                    },
                    {
                        src: 'node_modules/js-md5/src/md5.js',
                        dest: VENDOR_TARGET + 'md5.js'
                    },
                    {
                        src: 'node_modules/firebase/lib/firebase-web.js',
                        dest: VENDOR_TARGET + 'firebase-web.js'
                    },
                    {
                        src: 'node_modules/moment/min/moment.min.js',
                        dest: VENDOR_TARGET + 'moment.min.js'
                    },
                    {
                        expand: true,
                        cwd: 'src/img/',
                        src: '**/*',
                        dest: 'build/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**/*.js',
                        dest: 'build/js'
                    },
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        src: 'build/vendor/require.js',
                        dest: 'dist/vendor/require.js'
                    },
                    {
                        expand: true,
                        cwd: 'build/img/',
                        src: '**/*',
                        dest: 'dist/img'
                    }
                ]
            }
        },
        eslint: {
            src: [
                'src/js/**/*.*',
                'src/tests/**/*.js',
                '!src/js/plugins/**',
                'Gruntfile.js'
            ]
        },
        babel: {
            options: {
                sourceMap: true,
                blacklist: ['strict']
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: ['**/*.jsx'],
                        dest: 'build/js/',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: 'src/tests/',
                        src: ['**/*.spec.jsx'],
                        dest: 'build/tests/',
                        ext: '.spec.js'
                    },
                    {
                        expand: true,
                        cwd: 'src/tests/',
                        src: ['**/*.js'],
                        dest: 'build/tests/',
                        ext: '.js'
                    }
                ]
            }
        },
        watch: {
            dev: {
                files: [
                    'src/**/*.css',
                    'src/**/*.jsx',
                    'src/js/**/*.js',
                    'tests/**/*.jsx',
                    '!src/js/components/**/*.js',
                    '!src/js/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['default'],
                options: {
                    debounceDelay: 500
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'build/js',
                    mainConfigFile: 'build/js/main.js',
                    out: 'dist/js/main.min.js',
                    name: 'main',
                    optimization: 'uglify',
                    preserveLicenseComments: false
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    'dist/index.html': ['build/index.html']
                }
            }
        },
        karma: {
            unit: {
                port: 9999,
                singleRun: true,
                configFile: 'karma.conf.js',
                client: {
                    captureConsole: false
                }
            },
            debug: {
                port: 9999,
                singleRun: false,
                configFile: 'karma.conf.js',
                browser: ['Chrome']
            }
        },
        umd: {
            Firebase: {
                options: {
                    src: 'node_modules/firebase/lib/firebase-web.js',
                    dest: VENDOR_TARGET + 'firebase.js',
                    objectToExport: 'Firebase',
                    amdModuleId: 'Firebase',
                    deps: {
                        'default': ['require', 'exports', 'module'],
                        amd: ['require', 'exports', 'module']
                    }
                }
            },
            ReduxSimpleRouter: {
                options: {
                    src: 'node_modules/redux-simple-router/lib/index.js',
                    dest: VENDOR_TARGET + 'redux-simple-router.js',
                    //objectToExport: 'middleware',
                    amdModuleId: 'ReduxSimpleRouter',
                    deps: {
                        'default': ['require', 'exports', 'module'],
                        amd: ['require', 'exports', 'module']
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true,
                    base: 'build',
                    middleware: function (connect, options, middleware) {
                        middleware.unshift(historyApiFallbackMiddleware());
                        return middleware;
                    }
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/css/styles.min.css': ['src/css/**/*.css']
                }
            }
        }
    });

    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('lint', ['eslint']);
    grunt.registerTask('compile', ['babel']);
    grunt.registerTask('compile', ['umd', 'babel']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('build', ['lint', 'clean:build', 'compile', 'copy:build', 'cssmin']);
    grunt.registerTask('default', ['build', 'test']);
};
