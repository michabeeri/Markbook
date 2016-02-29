define(['react', 'components/toolbar/bookmarksSearch'],
    function (React, BookmarksSearch) {
        'use strict';

        return React.createClass({
            displayName: 'ToolBar',
            propTypes: {
                state: React.PropTypes.object.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            render: function () {
                return (
                    <div className='toolbar'>
                        <BookmarksSearch dispatch={this.props.dispatch} items={this.props.state.bookmarks} />
                    </div>
                );
            }
        });

    });
