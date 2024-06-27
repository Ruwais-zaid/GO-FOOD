// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-10  bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-green-600 p-1 rounded-lg  w-[30rem] md:w-[25rem] lg:w-[50rem] xl:w-[100rem] relative">
        <button onClick={onClose} className="absolute top-1 right-3 text-3xl font-bold text-red-500 ">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
