define(['lodash', 'constants'], function (_, Constants) {
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

    function getDefaultLayout() {
        var defaultLayout = Constants.layoutType.GRID;
        var localStorage = getItem(Constants.LOCAL_STORAGE_KEY);
        if (localStorage && localStorage.hasOwnProperty(Constants.LOCAL_STORAGE_LAYOUT)) {
            defaultLayout = localStorage[Constants.LOCAL_STORAGE_LAYOUT];
        }
        return defaultLayout;
    }

    function getDefaultSortType() {
        var defaultSort = Constants.sortTypes.DATE_ASC;
        var localStorage = getItem(Constants.LOCAL_STORAGE_KEY);
        if (localStorage && localStorage.hasOwnProperty(Constants.LOCAL_STORAGE_SORT)) {
            defaultSort = localStorage[Constants.LOCAL_STORAGE_SORT];
        }
        return defaultSort;
    }

    return {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        getDefaultLayout: getDefaultLayout,
        getDefaultSortType: getDefaultSortType
    };
});
