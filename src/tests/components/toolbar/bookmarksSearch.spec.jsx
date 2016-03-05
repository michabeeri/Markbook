define(['lodash', 'react', 'components/toolbar/bookmarksSearch', 'components/dropdown/dropdown'],
    function (_, React, BookmarksSearch, Dropdown) {
        'use strict';

        var testUtils = React.addons.TestUtils;

        describe('bookmarks search', function () {

            var bookmarksSearch, items, setFilter;

            beforeEach(function () {
                items = [
                    {
                        id: '1',
                        title: 'title1',
                        tags: ['title1tag1']
                    },
                    {
                        id: '2',
                        title: 'title2',
                        tags: ['title2tag1', 'title2tag2']
                    }
                ];
                setFilter = jasmine.createSpy('setFilter');
                bookmarksSearch = testUtils.renderIntoDocument(<BookmarksSearch items={items} setFilter={setFilter}/>);
            });

            it('should render the dropdown with data and setFilter props when search term is changed', function () {
                var searchInputNode = testUtils.findRenderedDOMComponentWithClass(bookmarksSearch, 'search-box');

                searchInputNode.value = 'title1';
                testUtils.Simulate.change(searchInputNode);

                var dropdownNode = testUtils.findRenderedComponentWithType(bookmarksSearch, Dropdown);
                var itemsPassedToDropdown = dropdownNode.props.data.items;

                expect(itemsPassedToDropdown[0].groupType).toEqual('title');
                expect(itemsPassedToDropdown[0].lines).toEqual(['title1']);

                expect(itemsPassedToDropdown[1].groupType).toEqual('tags');
                expect(itemsPassedToDropdown[1].lines).toEqual(['title1tag1']);
            });
        });

    });























