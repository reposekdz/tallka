import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start pt-10 md:pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--bg-primary)] rounded-2xl w-full max-w-xl shadow-xl transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-2 border-b border-[var(--border-color)]">
           <button onClick={onClose} className="p-1 rounded-full hover:bg-[var(--bg-secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;