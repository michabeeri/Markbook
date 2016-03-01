define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'EmailInput',
            getValue: function () {
                return this.refs.email.value;
            },
            render: function () {
                return (
                    <input ref='email' type='email' placeholder='Email' require autofocus/>
                );
            }
        });

    });
