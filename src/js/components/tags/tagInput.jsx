define(['React', 'lodash', 'components/dropdown/dropdown'],
    function (React, _, DropDown) {
        'use strict';

        return React.createClass({
            propTypes: {
                input: React.PropTypes.string.isRequired,
                addTag: React.PropTypes.func.isRequired,
                valueLink: React.PropTypes.object.isRequired,
                suggestions: React.PropTypes.object.isRequired
            },
            onKeyDown: function (event) {
                var tag = event.target.value;
                if (!_.isEmpty(tag)) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        this.props.addTag(tag);
                    }
                }
            },
            onLineClick: function (group, tag) {
                this.props.addTag(tag);
            },
            render: function () {
                return (
                    <div>
                        <span className="label">Add tag:</span>
                        <span className="input-wrapper">
                            <input className="input" type="text" onKeyDown={this.onKeyDown} ref="input"
                                   valueLink={this.props.valueLink}/>
                            {!_.isEmpty(this.props.input) ?
                                <DropDown ref="dropdown" data={this.props.suggestions}
                                          onLineClick={this.onLineClick}/> :
                                null
                            }
                        </span>

                    </div>
                );
            }
        });
    });
