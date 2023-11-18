import React from 'react';
import Modal from 'react-modal';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
    const customStyles: Modal.Styles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        border: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '20px',
        top: 0,
        right: 0,
        left: 'auto',
      },
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles} // Apply the custom styles here
      >
        {children}
      </Modal>
    );
  };
  
export default CustomModal;