define(['React', 'lodash', 'components/tags/tagInput', 'components/tags/tagsList'],
    function (React, _, TagInput, TagsList) {
        'use strict';

        return React.createClass({
            propTypes: {
                tags: React.PropTypes.array.isRequired,
                addTag: React.PropTypes.func.isRequired,
                removeTag: React.PropTypes.func.isRequired
            },
            getInitialState: function () {
                return {
                    tags: this.props.tags
                };
            },
            addTag: function (tag) {
                this.state.tags.push(tag);
                this.setState({
                    tags: this.state.tags
                });

                this.props.addTag(tag);
            },
            removeTag: function (tag) {
                _.pull(this.state.tags, tag);
                this.setState({
                    tags: this.state.tags
                });

                this.props.removeTag(tag);
            },
            render: function () {
                return (
                    <div>
                        <TagInput addTag={this.addTag}/>
                        <TagsList tags={this.state.tags} removeTag={this.removeTag}/>
                    </div>
                );
            }
        });
    });
