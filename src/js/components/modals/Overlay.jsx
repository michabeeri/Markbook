define(['react', 'lodash'],
    function (React, _) {
        'use strict';

        return React.createClass({
            displayName: 'Overlay',
            propTypes: {
                children: React.PropTypes.node.isRequired
            },
            preventAllInteractions: function (event) {
                if (_.indexOf(event.target.classList, 'scrollable-area') === -1) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            },
            render: function () {
                return (
                    <div className='overlay fixed-center' onClick={this.preventAllInteractions}
                         onWheel={this.preventAllInteractions}>
                        {this.props.children}
                    </div>
                );
            }
        });
    }
);
