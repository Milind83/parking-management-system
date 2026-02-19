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
      {
        label: "Owner Name",
        name: "ownerName",
        type: "text",
        placeholder: "Owner Name",
        required: true,
      },
      {
        label: "Flat No.",
        name: "flatNo",
        type: "text",
        placeholder: "Flat No.",
        required: true,
      },
      {
        label: "Vehicle Number",
        name: "vehicleNumber",
        type: "text",
        placeholder: "MH12AB1234",
        required: true,
      },
      {
        label: "Contact",
        name: "contact",
        type: "tel",
        placeholder: "Contact",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Email",
        required: true,
      },
      {
        label: "Vehicle Type",
        name: "vehicleType",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select Vehicle Type" },
          { value: "car", label: "Car" },
          { value: "bike", label: "Bike" },
        ],
      },
    ];
    const navigate = useNavigate();

    const [form, setForm] = useState({
      ownerName: "",
      flatNo: "",
      vehicleNumber: "",
      contact: "",
      email: "",
      vehicleType: "car",
    });

    const [qrValue, setQrValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      let { name, value } = e.target;

      if (name === "ownerName") {
        value = value.replace(/[^A-Za-z ]/g, "").slice(0, 20);
      }

      if (name === "vehicleNumber") {
        value = value.toUpperCase();
      }

      if (name === "contact") {
        value = value.replace(/\D/g, "").slice(0, 10);
      }
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const name = form.ownerName.trim();
      const contact = form.contact.trim();
      const vehicleNumber = form.vehicleNumber.trim().toUpperCase();

      // 🔹 Name validation
      const nameRegex = /^[A-Za-z ]{2,20}$/;
      if (!nameRegex.test(name)) {
        toast.error("Owner name must be letters only (max 20 characters)");
        return;
      }

      // 🔹 Contact validation
      const contactRegex = /^[6-9]\d{9}$/;
      if (!contactRegex.test(contact)) {
        toast.error("Enter valid 10-digit contact number");
        return;
      }

      // 🔹 Vehicle validation
      const vehicleRegex = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;
      if (!vehicleRegex.test(vehicleNumber)) {
        toast.error("Enter valid vehicle number (Example: MH12AB1234)");
        return;
      }

      // 🔹 Vehicle type validation
      if (!form.vehicleType) {
        toast.error("Please select vehicle type");
        return;
      }
      // Update form with formatted vehicle number
      const updatedForm = {
        ...form,
        vehicleNumber,
      };

      const qrString = JSON.stringify(updatedForm);
      const encodedQR = encodeURIComponent(qrString);

      setQrValue(qrString);
      setLoading(true);

      try {
        await emailjs.send("service_3uhbkvm", "template_hgthwuk", {
          to_email: updatedForm.email,
          owner_name: updatedForm.ownerName,
          vehicle_number: updatedForm.vehicleNumber,
          flat_no: updatedForm.flatNo,
          contact: updatedForm.contact,
          vehicle_type: updatedForm.vehicleType,
          qr_data: encodedQR,
        });

        toast.success("QR Code sent successfully!");
      } catch (error) {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send email. Please try again.");
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
