define(['React', 'lodash', 'components/tags/tagInput', 'components/tags/tagsList'],
    function (React, _, TagInput, TagsList) {
        'use strict';

        return React.createClass({
            propTypes: {
                tags: React.PropTypes.array.isRequired,
                addTag: React.PropTypes.func.isRequired,
                removeTag: React.PropTypes.func.isRequired
            },

            addTag: function (tag) {
                this.props.addTag(tag);
            },
            removeTag: function (tag) {
                this.props.removeTag(tag);
            },
            render: function () {
                return (
                    <div>
                        <TagInput addTag={this.addTag} tags={['naama', 'nam', 'na']}/>
                        <TagsList tags={this.props.tags} removeTag={this.removeTag}/>
                    </div>
                );
            }
        });
    });
