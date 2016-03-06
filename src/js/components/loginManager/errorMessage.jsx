/**
 * Created by lirank on 06/03/16.
 */


define(['react'],
    function (React) {
        'use strict';


        var ErrorComponont = React.createClass({
            displayName: 'Error',
            propTypes: {
                errorMessage: React.PropTypes.string.isRequired
            },
            render: function () {
                return (
                    <div className="error-message">
                        {this.props.errorMessage}
                    </div>
                );
            }
        });

        return ErrorComponont;

    });
