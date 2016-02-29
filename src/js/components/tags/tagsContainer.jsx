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
                if (this.props.tags.indexOf(tag) === -1) {
                    this.props.addTag(tag);
                }
            },
            removeTag: function (tag) {
                this.props.removeTag(tag);
            },
            userTags: ['naama', 'nam', 'na'],
            render: function () {
                return (
                    <div>
                        <TagInput addTag={this.addTag} userTags={this.userTags}/>
                        <TagsList tags={this.props.tags} removeTag={this.removeTag}/>
                    </div>
                );
            }
        });
    });
