define(
    ['react', 'components/toolbar/bookmarksSearch', 'actionProviders/actions', 'components/toolbar/orderBy', 'constants'],
    function (React, BookmarksSearch, ActionProvider, OrderBy, Constants) {
        'use strict';

        return React.createClass({
            displayName: 'ToolBar',
            propTypes: {
                state: React.PropTypes.object.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            setFilter: function (tag, title) {
                this.props.dispatch(ActionProvider.setFilter(tag, title));
            },
            setSortType: function (sortType) {
                this.props.dispatch(ActionProvider.setSortType(sortType));
            },
            render: function () {
                return (
                    <div className='toolbar'>
                        <BookmarksSearch setFilter={this.setFilter} items={this.props.state.bookmarks}/>
                        <OrderBy setSortType={this.setSortType} sortTypes={Constants.sortTypes} selectedSortType={this.props.state.sort.sortType}/>
                    </div>
                );
            }
        });

    });
