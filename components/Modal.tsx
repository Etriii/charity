import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

 return (
   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        ref={modalContentRef}
className="relative border p-8 bg-white border-gray-300 shadow-lg rounded-xl max-h-[94%] w-full sm:w-[70%] md:w-auto max-w-[90%] transform transition-transform duration-300 scale-100 overflow-y-auto no-scrollbar"
      >
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;