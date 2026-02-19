import React from 'react';

/**
 * Common dropdown/select component for forms.
 * Props: label, name, value, onChange, required, options (array of {value, label}), className, ...rest
 */
const FormDropdown = ({ label, name, value, onChange, required = false, options = [], className = '', errors, ...rest }) => (
  <div className="mb-3">
    {label && <label htmlFor={name} className="form-label">{label}</label>}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`form-select ${className}`}
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {errors && errors.type === "required" && (
      <p className="text-danger mt-1 small">This field is required</p>
    )}
    {errors && errors.type !== "required" && (
      <p className="text-danger mt-1 small">{errors.message}</p>
    )}
  </div>
);

export default FormDropdown;
