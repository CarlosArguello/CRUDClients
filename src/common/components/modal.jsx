import React from 'react';
import ReactModal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : "none",
    maxHeight             : "100vh",
    padding               : "0"
  }
};
 
 
const Modal = ({ children, isOpen, onClose }) => {

    return (
      <ReactModal
        isOpen={ isOpen }
        onRequestClose={ onClose }
        style={customStyles}
      >
        <div 
          className="max-w-full rounded-md shadow-md border p-6"
          style={{ width: 800 }}
        >
          { children }
        </div>
      </ReactModal>
    )
}

export default Modal