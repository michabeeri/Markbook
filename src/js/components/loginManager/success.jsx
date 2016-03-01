define(['lodash', 'react', 'router'],
    function (_, React, ReactRouter) {
        'use strict';

        var Link = ReactRouter.Link;

        return React.createClass({
            mixins: [ReactRouter.History],
            displayName: 'Success',
            render: function () {
                return (
                    <section>
                        <h1>Welcome {this.props.routes[0].getEmail()}</h1>
                        <Link to='/'>Sign-Out</Link>
                    </section>
                );
            }
        });

    });
