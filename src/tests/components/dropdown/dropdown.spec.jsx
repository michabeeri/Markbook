define(['react', 'components/dropdown/dropdown'],
    function (React, Dropdown) {
        'use strict';

        var TestUtils = React.addons.TestUtils;

        describe('Dropdown', function () {

            var data, dropdown, callback;

            beforeEach(function () {
                data = {
                    input: 'f',
                    items: [{title: 'Bookmarks', groupType: 'bookmark', lines: ['name1', 'name2', 'name3']},
                        {title: 'Tags', groupType: 'tag', lines: ['tag1', 'tag2', 'tag3']},
                        {title: 'Random', groupType: 'random', lines: []}]
                };
                callback = function () {};
            });

            describe('Dropdown list', function () {
                it('should have the same number of lists as items elements', function () {
                    dropdown = TestUtils.renderIntoDocument(<Dropdown data={data} onLineClick={callback}/>);
                    expect(dropdown.refs.dropdownList.children.length).toBe(data.items.length);
                });
            });

            describe('Nested dropdown list', function () {
                it('should have the same number of list items as lines given', function () {
                    dropdown = TestUtils.renderIntoDocument(<Dropdown data={data} onLineClick={callback}/>);
                    expect(dropdown.refs.group0.children.length).toBe(data.items[0].lines.length);
                });

                it('should have one list item if no lines are given', function() {
                    dropdown = TestUtils.renderIntoDocument(<Dropdown data={data} onLineClick={callback}/>);
                    expect(dropdown.refs.group2.children.length).toBe(1);
                });
            });

            describe('Nested dropdown item', function () {
                it('should have a valid type', function () {
                    dropdown = TestUtils.renderIntoDocument(<Dropdown data={data} onLineClick={callback}/>);
                    expect(dropdown.refs.bookmark0.dataset.type).toEqual('bookmark');
                });

                it('should call onclick callback from parent with valid arguments', function () {
                    var props = {
                        data: data,
                        onLineClick: callback
                    };
                    spyOn(props, 'onLineClick');
                    var comp = React.createElement(Dropdown, props);
                    dropdown = TestUtils.renderIntoDocument(comp);
                    TestUtils.Simulate.mouseDown(dropdown.refs.bookmark0);
                    expect(props.onLineClick).toHaveBeenCalledWith('bookmark', 'name1');
                })
            });

        });
    });
