import React from "react";

const MyModal = ({ children, visible, setVisible }) => {
    return (
        <div id="modal1" className={visible ? 'modal show-on-large z-up' : 'modal'}>
            <div className="modal-content">
                <h4>Add User</h4>
                {children}
            </div>
            <div className="modal-footer"></div>
        </div>
    )
}

export default MyModal
