define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'ActionControls',
            propTypes: {
                onSelectAll: React.PropTypes.func.isRequired
            },
            render: function () {
                return (
                    <div className='action-controls btn-group contained inline'>
                        <button className='btn'>Select All</button>
                        <button className='btn'>Edit</button>
                        <button className='btn'>Delete</button>
                        <button className='btn'><i className='fa fa-list'></i></button>
                    </div>
                );
            }
        });

    });
