define(['lodash', 'react', 'components/dropdown/dropdown', 'actionProviders/actions'],
    function (_, React, Dropdown, ActionProvider) {
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
                dispatch: React.PropTypes.func.isRequired,
                items: React.PropTypes.array.isRequired
            },
            getSearchResult: function () {
                var items = this.props.items;
                console.info('items: ', items);
                var searcTerm = this.state.searchTerm;
                var resultTags = [];
                var resultTitles = [];
                _.forEach(items, function (item) {
                    if (item.title.startsWith(searcTerm) && !_.contains(resultTitles, item.title)) {
                        resultTitles.push(item.title);
                    }
                    var tags = item[tags] || [];
                    var filteredTags = _.filter(tags, function (tag) {
                        return tag.startsWith(searcTerm);
                    });
                    resultTags = _.union(resultTags, filteredTags);
                });
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
                this.props.dispatch(ActionProvider.setFilter(tag, title));
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
