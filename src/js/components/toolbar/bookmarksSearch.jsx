define(['lodash', 'react', 'components/dropdown/dropdown', 'utils/bookmarksUtil', 'constants', 'components/tags/inputWithSuggestions'],
    function (_, React, Dropdown, BookmarksUtil, Constants, InputWithSuggestions) {
        'use strict';

        return React.createClass({
            displayName: 'BookmarksSearch',
            mixins: [React.addons.LinkedStateMixin],
            getInitialState: function () {
                return {
                    searchTerm: ''
                };
            },
            propTypes: {
                setFilter: React.PropTypes.func.isRequired,
                items: React.PropTypes.array.isRequired
            },
            getSearchResult: function () {
                var filterResults = BookmarksUtil.filterItems(this.props.items, this.state.searchTerm,
                    ['title', 'tags']);

                var searchResults = {items: []};
                searchResults.items.push({
                    title: 'Bookmarks',
                    groupType: 'title',
                    lines: filterResults.title
                });
                searchResults.items.push({
                    title: 'Tags',
                    groupType: 'tags',
                    lines: filterResults.tags
                });
                return searchResults;
            },
            filterBookmarksByTerm: function (filterTerm, group) {
                var tag = '';
                var title = '';
                if (group === 'tags') {
                    tag = filterTerm;
                } else {
                    title = filterTerm;
                }
                this.setState({searchTerm: ''});
                this.props.setFilter(tag, title);
            },
            render: function () {
                return (
                    <div className="search-box contained inline">
                        <InputWithSuggestions suggestions={this.getSearchResult()}
                                              onInputSelected={this.filterBookmarksByTerm}
                                              valueLink={this.linkState('searchTerm')}
                                              placeholder="Search"
                        />
                    </div>

                );
            }
        });

    });
