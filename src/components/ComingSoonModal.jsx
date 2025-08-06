import React from 'react';

const ComingSoonModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        onClick={onClose}
    >
      <div 
        className="bg-white p-12 rounded-lg shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yakında Hizmetinizde!</h2>
        <p className="text-gray-600">Bu özellik üzerinde çalışıyoruz. En kısa sürede aktif olacaktır.</p>
        <button 
            onClick={onClose} 
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
            Kapat
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal; 