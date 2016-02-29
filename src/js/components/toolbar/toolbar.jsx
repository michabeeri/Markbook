define(['react', 'constants', 'actionProviders/actions'],
    function (React, Constants, UserInfoActionProvider) {
        'use strict';

        return React.createClass({
            displayName: 'TopBar',
            propTypes: {
                state: React.PropTypes.object.isRequired,
                dispatch: React.PropTypes.func.isRequired
            },
            onLogout: function () {
                this.props.dispatch(UserInfoActionProvider.logout());
            },
            render: function () {
                return (
                    <div></div>
                );
            }
        });

    });
