// AlertBox.jsx
import React from 'react';

const AlertBox = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-4 rounded shadow-lg max-w-sm w-full">
                <p>{message}</p>
                <button 
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AlertBox;
