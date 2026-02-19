import React from 'react';

/**
 * Common form input component for text, email, tel, etc.
 * Props: label, type, name, value, onChange, placeholder, required, className, ...rest
 */
const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false, className = '', errors, ...rest }) => (
  <div className="mb-3">
    {label && <label htmlFor={name} className="form-label">{label}</label>}
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`form-control ${className}`}
      {...rest}
    />
    {errors && errors.type === "required" && (
      <p className="text-danger mt-1 small">This field is required</p>
    )}
    {errors && errors.type !== "required" && (
      <p className="text-danger mt-1 small">{errors.message}</p>
    )}
  </div>
);

export default FormInput;
