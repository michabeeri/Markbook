define(
    ['react', 'components/toolbar/bookmarksSearch', 'actionProviders/actions', 'components/toolbar/orderBy', 'constants', 'components/toolbar/actionControls', 'utils/bookmarksUtil'],
    function (React, BookmarksSearch, ActionProvider, OrderBy, Constants, ActionControls, BookmarksUtil) {
        'use strict';

        return React.createClass({
            displayName: 'ToolBar',
            propTypes: {
                items: React.PropTypes.array.isRequired,
                sort: React.PropTypes.object.isRequired,
                dispatch: React.PropTypes.func.isRequired,
                layout: React.PropTypes.string.isRequired,
                switchLayout: React.PropTypes.func.isRequired,
                minGridLayoutExceeded: React.PropTypes.bool.isRequired
            },
            setFilter: function (tag, title) {
                this.props.dispatch(ActionProvider.setFilter(tag, title));
            },
            setSortType: function (sortType) {
                this.props.dispatch(ActionProvider.setSortType(sortType));
            },
            onSelectDeselectAll: function (isSelectAll) {
                this.props.dispatch(ActionProvider.selectDeselectAll(isSelectAll));
            },
            render: function () {
                return (
                    <div className='app-line-container'>
                        <BookmarksSearch setFilter={this.setFilter} items={this.props.items}/>
                        <OrderBy setSortType={this.setSortType} sortTypes={Constants.sortTypes}
                                 selectedSortType={this.props.sort.sortType}
                                 hiddenSortType={Constants.CUSTOM_SORT_TYPE}/>
                        <ActionControls onSelectDeselectAll={this.onSelectDeselectAll}
                                        totalSelected={BookmarksUtil.getTotalSelectedBookmarks(this.props.items)}
                                        layoutType={this.props.layout}
                                        switchLayout={this.props.switchLayout}
                                        minGridLayoutExceeded={this.props.minGridLayoutExceeded}/>
                    </div>
                );
            }
        });

    });
