define(['lodash', 'react', 'components/dropdown/dropdown', 'utils/bookmarksUtil', 'constants'],
    function (_, React, Dropdown, BookmarksUtil, Constants) {
        'use strict';

        var SearchBox = React.createClass({
            displayName: 'SearchBox',
            onChange: function (event) {
                if (event.keyCode === Constants.DOWN_ARROW) {

                }
            },
            render: function () {
                return (
                    <div className='search-box-container contained btn-border'>
                        <label><i className='fa fa-search'></i></label>
                        <input id='search-input' className='input search-box' placeholder='Search'
                               onKeyDown={this.onChange}
                               valueLink={this.props.valueLink}/>
                    </div>
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
            filterBookmarksByTerm: function (type, filterTerm) {
                var tag = '';
                var title = '';
                if (type === 'tags') {
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
