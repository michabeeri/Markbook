define(['lodash', 'utils/relationshipTreeUtil'], function (_, RelationshipTreeUtil) {
    'use strict';

    describe('relationship tree utils', function () {

        describe('getRelationshipTree', function () {

            it('should create a relationship tree', function () {
                var bookmarks = [
                    {
                        id: '0000',
                        children: ['0001', '0002']
                    },
                    {
                        id: '0001',
                        children: null
                    },
                    {
                        id: '0002',
                        children: ['0003']
                    },
                    {
                        id: '0003',
                        children: null
                    }
                ];

                var tree = RelationshipTreeUtil.getRelationshipTree(bookmarks, '0000');
                expect(tree.id).toEqual('0000');
                expect(tree.children[0].id).toEqual('0001');
                expect(tree.children[1].id).toEqual('0002');
                expect(tree.children[1].children[0].id).toEqual('0003');

            });

        });

        describe('getIdsToRemove', function () {

            var tree,
                ids;

            it('should remove all children of selected groups', function () {
                tree = {id: '0000', isGroup: true, children: [
                    {id: '0001', children: []},
                    {id: '0002', isGroup: true, children: [
                        {id: '0003', children: []}
                    ]}
                ]};

                ids = RelationshipTreeUtil.getIdsToRemove(tree, ['0002']);
                expect(ids).toEqual(['0002', '0003']);

            });

            it('should remove empty groups', function () {
                tree = {id: '0000', isGroup: true, children: [
                    {id: '0001', children: null},
                    {id: '0002', isGroup: true, children: [
                        {id: '0003', isGroup: true, children: [
                            {id: '0004', isGroup: true, children: [
                                {id: '0005', children: null}
                            ]}
                        ]}
                    ]}
                ]};

                ids = RelationshipTreeUtil.getIdsToRemove(tree, ['0005']);
                expect(ids).toEqual(['0002', '0003', '0004', '0005']);

            });

        });
    });
});
