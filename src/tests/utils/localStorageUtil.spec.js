define(['lodash', 'utils/localStorageUtil'], function (_, localStorageUtil) {
    'use strict';

    describe('localStorage utils', function () {

        describe('getItem', function () {
            var key = 'testKey';

            it('should call local storage getItem with given key', function () {
                spyOn(localStorage, 'getItem');
                localStorageUtil.getItem(key);
                expect(localStorage.getItem).toHaveBeenCalledWith(key);
            });

            it('should return plain object', function () {
                spyOn(localStorage, 'getItem').and.returnValue('{"id": 1, "name": "test"}');
                var item = localStorageUtil.getItem(key);
                expect(_.isPlainObject(item)).toBeTruthy();
            });

            it('should print a console message if key does not exist in local storage', function () {
                spyOn(localStorage, 'getItem').and.returnValue('{invalid"}');
                spyOn(console, 'error');

                localStorageUtil.getItem(key);
                expect(console.error).toHaveBeenCalled();
            });

            it('should print a console message if key was not passed', function () {
                spyOn(console, 'error');

                localStorageUtil.getItem();
                expect(console.error).toHaveBeenCalled();
            });
        });


    });

});
