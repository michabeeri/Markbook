define(['lodash', 'react', 'components/dropdown/dropdown'],
    function (_, React, Dropdown) {
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
                var items = this.props.items;

                var searcTerm = this.state.searchTerm;

                var resultTitles =
                    _.chain(items)
                        .map('title')
                        .filter(function (item) {
                            return item.startsWith(searcTerm);
                        })
                        .union()
                        .sort()
                        .value();

                var resultTags =
                    _.chain(items)
                        .map('tags')
                        .flatten()
                        .filter(function (tag) {
                            return tag && tag.startsWith(searcTerm);
                        })
                        .union()
                        .sort()
                        .value();


                var results = {
                    items: []
                };
                if (!_.isEmpty(resultTags)) {
                    results.items.push({
                        type: 'tags',
                        lines: resultTags
                    });
                }
                if (!_.isEmpty(resultTitles)) {
                    results.items.push({
                        type: 'title',
                        lines: resultTitles
                    });
                }
                return results;
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
                    <div>
                        <SearchBox valueLink={this.linkState('searchTerm')}/>
                        {dropdown}
                    </div>
                );
            }
        });

    });
