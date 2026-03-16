import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-2 rounded-lg relative max-w-4xl max-h-full overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-700"
        >
          &times;
        </button>
        <img src={imageUrl} alt="resume full" className="max-w-full max-h-[90vh]" />
      </div>
    </div>
  );
};

export default ResumeModal;