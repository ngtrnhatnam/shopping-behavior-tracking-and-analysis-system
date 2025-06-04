import React from 'react';

const FloatingInput = ({ id, label, type = "text", value, onChange, error }) => {
  return (
    <div className="mb-6">
      <label className="relative bg-gray-100 rounded-lg shadow-sm px-3 pt-6 pb-2 block cursor-text">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" " 
          className="peer w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-transparent"
        />
        <span
          className="absolute left-3 top-1 text-sm text-gray-500 transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-1 peer-focus:text-sm peer-focus:text-purple-500"
        >
          {label}
        </span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FloatingInput;