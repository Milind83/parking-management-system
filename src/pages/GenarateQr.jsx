import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import FormInput from '../Components/FormInput';
import FormDropdown from '../Components/FormDropdown';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'react-hot-toast';

// ✅ Initialize EmailJS once

const GenarateQr = () => {
    emailjs.init('DjO-iBVw6q_y5AADb'); // your public key
    
    const fields = [
      { label: 'Owner Name', name: 'ownerName', type: 'text', placeholder: 'Owner Name', required: true },
      { label: 'Flat No.', name: 'flatNo', type: 'text', placeholder: 'Flat No.', required: true },
      { label: 'Contact', name: 'contact', type: 'tel', placeholder: 'Contact', required: true },
      { label: 'Email', name: 'email', type: 'email', placeholder: 'Email', required: true },
      {
        label: 'Vehicle Type',
        name: 'vehicleType',
        type: 'select',
        required: true,
        options: [
          { value: 'car', label: 'Car' },
          { value: 'bike', label: 'Bike' },
        ],
      },
    ];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ownerName: '',
    flatNo: '',
    contact: '',
    email: '',
    vehicleType: 'car',
  });

  const [qrValue, setQrValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qrString = JSON.stringify(form);
    const encodedQR = encodeURIComponent(qrString);
    setQrValue(qrString);
    setLoading(true);
    try {
      await emailjs.send(
        'service_3uhbkvm',
        'template_hgthwuk',
        {
          to_email: form.email,
          owner_name: form.ownerName,
          flat_no: form.flatNo,
          contact: form.contact,
          vehicle_type: form.vehicleType,
          qr_data: encodedQR,
        }
      );
      toast.success('QR Code sent successfully!');
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send email. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card shadow w-100">
        <div className="card-body">

          <button
            className="btn mb-3 p-0"
            onClick={() => navigate('/')}
          >
            &larr; Back to Home
          </button>

          <h2 className="card-title text-center mb-4">
            Generate QR Code
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-row flex-wrap gap-3">
              {fields.map((field) =>
                field.type === 'select' ? (
                  <FormDropdown
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    options={field.options}
                  />
                ) : (
                  <FormInput
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                )
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Generate QR'}
            </button>
          </form>

          {qrValue && (
            <div className="text-center mt-4">
              <QRCode value={qrValue} size={180} />
              <div className="mt-2 text-secondary small">
                Scan to view details
              </div>
            </div>
          )}

        </div>
      </div>
          </div>
          </>
  );
};

export default GenarateQr;
