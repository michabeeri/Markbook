define(['react', 'components/dropdown/dropdown'],
    function (React, Dropdown) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Dropdown', function () {

            var items, dropdown;

            beforeEach(function () {
                items = [{title: 'bookmarks', groupType: 'bookMark', lines: ['name1', 'name2', 'name3']}, {title: 'tags', groupType: 'tag', lines: ['tag1', 'tag2', 'tag3']}];
                dropdown = TestUtils.renderIntoDocument(<Dropdown items={items}/>);
            });

            //describe('Nested dropdown list', function () {
            //    it('should render nested list with title', function () {
            //
            //    });
            //});

            describe('Nested dropdown item', function () {
                fit('should have a valid type', function () {
                    console.log('data', dropdown.refs.line0.dataset);
                });
            });

        });
    });
