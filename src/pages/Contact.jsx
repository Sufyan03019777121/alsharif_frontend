import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container container py-5">
      <h2 className="text-center mb-5 contact-heading">📬 Get in Touch</h2>

      <div className="row g-4">
        {/* Contact Info */}
        <div className="col-md-6 contact-info bg-light rounded shadow-sm p-4">
          <h4 className="mb-3">Contact Information</h4>
          <p><strong>📞 Phone:</strong> +92 300 1234567</p>
          <p><strong>📧 Email:</strong> contact@alsharifnursery.com</p>
          <p><strong>📍 Location:</strong> Lahore, Pakistan</p>
          <p className="mt-4 text-muted">
            We usually respond within 24 hours. You can also reach us on WhatsApp.
          </p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow contact-form">
            <h4 className="mb-4">Send Us a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100">
                ✉️ Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .contact-container {
          background: #f9f9f9;
          border-radius: 10px;
        }

        .contact-heading {
          font-weight: bold;
          color: #2a7d2e;
        }

        .contact-info {
          background: #e7f5e6;
          border-left: 4px solid #2a7d2e;
        }

        .contact-form {
          transition: box-shadow 0.3s;
        }

        .contact-form:hover {
          box-shadow: 0 0 20px rgba(0, 128, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Contact;
