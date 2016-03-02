define(['lodash'], function (_) {
    'use strict';

    function getItem(key) {
        if (_.isUndefined(key)) {
            return console.error('Key was not passed');
        }

        var item = localStorage.getItem(key);
        try {
            return JSON.parse(item);
        } catch (e) {
            console.error('Failed to parse item', e);
        }
    }

    function setItem() {

    }

    function removeItem() {

    }

    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem
    };
});
