define(['React', 'lodash', 'components/tags/tagInput', 'components/tags/tagsList'],
    function (React, _, TagInput, TagsList) {
        'use strict';

        return React.createClass({
            propTypes: {
                tags: React.PropTypes.array.isRequired,
                addTag: React.PropTypes.func.isRequired,
                removeTag: React.PropTypes.func.isRequired
            },
            render: function () {
                return (
                    <div>
                        <TagInput addTag={this.props.addTag}/>
                        <TagsList tags={this.props.tags} removeTag={this.props.removeTag}/>
                    </div>
                );
            }
        });
    });
