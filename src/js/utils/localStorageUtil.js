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

    function setItem(key, value) {
        if (_.isUndefined(key) || _.isUndefined(value)) {
            return console.error('Key/value were not passed');
        }

        var valueStr;
        try {
            valueStr = JSON.stringify(value);
        } catch (e) {
            return console.error('Failed to stringify item', e);
        }

        try {
            localStorage.setItem(key, valueStr);
        } catch (e) {
            console.error('Failed to set item', e);
        }
    }

    function removeItem(key) {
        localStorage.removeItem(key);
    }

    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem
    };
});
