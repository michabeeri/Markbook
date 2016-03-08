define(
    ['lodash', 'react', 'components/toolbar/bookmarksSearch', 'actionProviders/actions', 'components/toolbar/orderBy', 'constants', 'components/toolbar/actionControls', 'utils/bookmarksUtil'],
    function (_, React, BookmarksSearch, ActionProvider, OrderBy, Constants, ActionControls, BookmarksUtil) {
        'use strict';

        return React.createClass({
            displayName: 'ToolBar',
            propTypes: {
                items: React.PropTypes.array.isRequired,
                currentGroupId: React.PropTypes.string.isRequired,
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
                var currentGroupId = this.props.currentGroupId;
                var group = _.filter(this.props.items, function (item) {
                    return item.id === currentGroupId;
                })[0];
                this.props.dispatch(ActionProvider.selectDeselectAll(group.children, isSelectAll));
            },
            onEdit: function () {
                this.props.dispatch(
                    ActionProvider.openBookmarkDataModal(BookmarksUtil.getSelectedBookmarks(this.props.items)[0].id));
            },
            onDelete: function () {
                this.props.dispatch(ActionProvider.removeBookmark(_(this.props.items).filter({selected: true}).map('id').value()));
            },
            render: function () {
                var items = this.props.items;
                var totalSelected = BookmarksUtil.getTotalSelectedBookmarks(items);
                var currentViewItems = BookmarksUtil.getItemsByGroupId(items, this.props.currentGroupId);
                return (
                    <div className='app-line-container'>
                        <BookmarksSearch setFilter={this.setFilter} items={items}/>
                        <OrderBy setSortType={this.setSortType} sortTypes={Constants.sortTypes}
                                 selectedSortType={this.props.sort.sortType}
                                 hiddenSortType={Constants.CUSTOM_SORT_TYPE}/>
                        <ActionControls onSelectDeselectAll={this.onSelectDeselectAll}
                                        totalSelected={totalSelected}
                                        isAllSelected={totalSelected === currentViewItems.length}
                                        layoutType={this.props.layout}
                                        switchLayout={this.props.switchLayout}
                                        minGridLayoutExceeded={this.props.minGridLayoutExceeded}
                                        onEdit={this.onEdit}
                                        onDelete={this.onDelete}/>
                    </div>
                );
            }
        });

    });
