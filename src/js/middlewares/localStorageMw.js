define(['lodash', 'constants', 'actionProviders/actions', 'utils/localStorageUtil'],
    function (_, Constants, ActionProvider, LocalStorageUtil) {
        'use strict';

        return function localStorageMiddleware() {
            return function (next) {
                return function (action) {
                    var markbook;
                    if (action.type === Constants.SET_SORT_TYPE) {
                        markbook = LocalStorageUtil.getItem(Constants.LOCAL_STORAGE_KEY) || {};
                        markbook[Constants.LOCAL_STORAGE_SORT] = action.sortType;
                        LocalStorageUtil.setItem(Constants.LOCAL_STORAGE_KEY, markbook);
                    } else if (action.type === Constants.SET_LAYOUT) {
                        markbook = LocalStorageUtil.getItem(Constants.LOCAL_STORAGE_KEY) || {};
                        markbook[Constants.LOCAL_STORAGE_LAYOUT] = action.layoutType;
                        LocalStorageUtil.setItem(Constants.LOCAL_STORAGE_KEY, markbook);
                    }
                    return next(action);
                };
            };
        };
    });
