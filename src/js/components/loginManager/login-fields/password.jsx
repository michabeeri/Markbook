define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'PasswordInput',
            getValue: function () {
                return this.refs.input.value;
            },
            render: function () {
                var placeholder = this.props.placeholder || 'Password';
                return (
                    <input className='input password' ref='input' type='password' placeholder={placeholder}
                           required/>
                );
            }
        });

    });
