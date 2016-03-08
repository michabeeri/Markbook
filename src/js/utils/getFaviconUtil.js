/**
 * Created by lirank on 08/03/16.
 */


define([], function () {
    'use strict';

    function getFaviconUrlOf(domain) {
        return 'http://www.google.com/s2/favicons?domain=' + domain;
    }

    return {
        getFaviconUrlOf: getFaviconUrlOf
    };
});
