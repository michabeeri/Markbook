define(['react'],
    function (React) {
        'use strict';

        return React.createClass({
            displayName: 'Modal',
            propTypes: {
                dispatch: React.PropTypes.func.isRequired,
                className: React.PropTypes.string.isRequired,
                children: React.PropTypes.node.isRequired,
                close: React.PropTypes.func.isRequired
            },
            render: function () {
                return (

                    <div className={this.props.className}>
                        <div className="modal-content form-container">
                            <i className='fa fa-times btn-close' id='modalCloser' onClick={this.props.close}></i>
                            {this.props.children}
                        </div>
                    </div>

                );
            }
        });
    }
);
