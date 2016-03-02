define(['lodash', 'react', 'components/dropdown/dropdown', 'utils/bookmarksUtil'],
    function (_, React, Dropdown, BookmarksUtil) {
        'use strict';

        var SearchBox = React.createClass({
            displayName: 'SearchBox',
            render: function () {
                return (
                    <input className='input search-box' placeholder='Search' valueLink={this.props.valueLink}/>
                );
            }
        });

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

                var filterResults = BookmarksUtil.filterItems(this.props.items, this.state.searchTerm, ['title', 'tags']);

                var searchResults = {items: []};
                if (!_.isEmpty(filterResults.title)) {
                    searchResults.items.push({
                        type: 'title',
                        lines: filterResults.title
                    });
                }
                if (!_.isEmpty(filterResults.tags)) {
                    searchResults.items.push({
                        type: 'tags',
                        lines: filterResults.tags
                    });
                }
                return searchResults;
            },
            filterBookmarksByTerm: function (type, filterTerm) {
                var tag = '';
                var title = '';
                if (type === 'tag') {
                    tag = filterTerm;
                } else {
                    title = filterTerm;
                }
                this.setState({searchTerm: ''});
                this.props.setFilter(tag, title);
            },
            render: function () {
                var dropdown = null;
                if (this.state.searchTerm) {
                    dropdown = <Dropdown data={this.getSearchResult()} onLineClick={this.filterBookmarksByTerm}/>;
                }
                return (
                    <div className='inline'>
                        <SearchBox valueLink={this.linkState('searchTerm')}/>
                        {dropdown}
                    </div>
                );
            }
        });

    });
