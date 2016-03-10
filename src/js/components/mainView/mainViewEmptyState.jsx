define(['react'], function (React) {
    'use strict';

    return React.createClass({
        propTypes: {
            openAddBookMarkModal: React.PropTypes.func.isRequired
        },
        render: function () {
            return (
                <div className = 'empty-state-container'>
                    <h1 className = 'empty-state-container-title'>Welcome</h1>
                    <img src='img/panda.png' alt='bookmark' width='300' height="310"/>
                    <a className="btn btn-add" onClick={this.props.openAddBookMarkModal}><i className="fa fa-plus-circle"></i></a>
                    <p>Add your first bookmark</p>
                </div>
            );
        }

    });
});
