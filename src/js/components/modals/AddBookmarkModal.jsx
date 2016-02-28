define(['react', 'components/modals/Modal'],
    function (React, Modal) {
        'use strict';

        return React.createClass({
            getInitialState: function () {
                return {
                    modalShouldBeOpened: false
                };
            },
            openModal: function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                this.setState({
                    modalShouldBeOpened: true
                });
                document.body.style.overflow = 'hidden';
            },
            closeModal: function () {
                this.setState({
                    modalShouldBeOpened: false
                });
            },
            render: function () {
                var className = this.state.modalShouldBeOpened ? 'modalDialog opened' : 'modalDialog closed';

                return (
                    <div>
                        <a href='#' onClick={this.openModal}>Open Modal</a>
                        <Modal className={className} onClose={this.closeModal}>
                            <h1>Add Bookmark modal soon will be here</h1>
                            <p>Add Bookmark content</p>
                        </Modal>
                    </div>
                );
            }
        });
    }
);
