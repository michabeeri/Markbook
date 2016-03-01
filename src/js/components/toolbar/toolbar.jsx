define(['react', 'components/toolbar/bookmarksSearch', 'actionProviders/actions'],
    function (React, BookmarksSearch, ActionProvider) {
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
            render: function () {
                return (
                    <div className='toolbar'>
                        <BookmarksSearch setFilter={this.setFilter} items={this.props.state.bookmarks}/>
                    </div>
                );
            }
        });

    });
