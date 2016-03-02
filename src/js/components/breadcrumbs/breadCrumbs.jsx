define(['lodash',
        'react',
        'actionProviders/actions',
        'constants',
        'utils/bookmarksUtil',
        'utils/breadCrumbsUtil'
    ],
    function (_, React, ActionProvider, Constants, BookmarksUtil, BreadCrumbsUtil) {
        'use strict';

        function foldItemsIfNeeded(path, items) {
            var foldThreshold = 3;
            var foldSymbol = '...';

            if (path.length > foldThreshold) {
                items.splice(1, items.length - (foldThreshold + 1));
                items[items.length - foldThreshold].title = foldSymbol;
            }
            return items;
        }

        return React.createClass({
            displayName: 'BreadCrumbs',
            propTypes: {
                dispatch: React.PropTypes.func.isRequired,
                currentPath: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
                bookmarks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
            },
            onItemClick: function (id) {
                this.props.dispatch(ActionProvider.navigateToPreviousGroup(id));
            },
            renderItem: function (item) {
                var onClick = BookmarksUtil.isCurrentGroup(this.props.currentPath, item.id) ?
                    null : this.onItemClick.bind(this, item.id);

                return <span className='title-small group-item' onClick={onClick} key={item.id}>{item.title}</span>;
            },
            render: function () {
                var path = this.props.currentPath;
                var items = BreadCrumbsUtil.getItemsData(path, this.props.bookmarks);
                items = foldItemsIfNeeded(path, items);

                return (
                    <nav className="groups-item-container box">
                        {_.map(items, this.renderItem)}
                    </nav>
                );
            }
        });
    }
)
;
