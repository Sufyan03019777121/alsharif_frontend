import React from "react";

const CheckoutPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">
        
        {/* Shipping Info */}
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm border-0 rounded">
            <h4 className="text-success">Shipping Information</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="Enter your address" />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" placeholder="Enter your city" />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" placeholder="Enter your phone number" />
              </div>
            </form>
          </div>
        </div>

        {/* Payment Info */}
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm border-0 rounded">
            <h4 className="text-success">Payment Information</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Select Payment Method</label>
                <select className="form-select">
                  <option value="card">Credit/Debit Card</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="jazzcash">JazzCash</option>
                </select>
              </div>

              {/* Card Details */}
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control" placeholder="Enter card number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Expiry Date</label>
                <input type="text" className="form-control" placeholder="MM/YY" />
              </div>
              <div className="mb-3">
                <label className="form-label">CVV</label>
                <input type="text" className="form-control" placeholder="CVV" />
              </div>

              {/* EasyPaisa / JazzCash Info (Static message) */}
              <div className="alert alert-info mt-3" role="alert">
                For EasyPaisa or JazzCash, please send payment to:<br />
                <strong>Account Number:</strong> 0345-1234567<br />
                After payment, please mention Transaction ID in the order notes.
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Order Summary */}
      <div className="row">
        <div className="col-12">
          <div className="card p-4 shadow-sm border-0 rounded">
            <h4 className="text-success">Order Summary</h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Product 1</span>
                <strong>Rs. 1000</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Product 2</span>
                <strong>Rs. 2000</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>Rs. 3000</strong>
              </li>
            </ul>
            <button className="btn btn-success w-100">Place Order</button>
          </div>
        </div>
      </div>

      {/* Internal CSS for Checkout Page Styling */}
      <style jsx>{`
        .card {
          border-radius: 15px;
        }

        .card p {
          font-size: 14px;
        }

        .btn-success {
          background-color: #2a7d2e !important;
          border-color: #2a7d2e !important;
          padding: 12px;
          font-size: 18px;
          font-weight: bold;
        }

        .btn-success:hover {
          background-color: #1f5e1b !important;
          border-color: #1f5e1b !important;
        }

        .alert-info {
          background-color: #e7f4e4;
          border-color: #c1e6c1;
          color: #2a7d2e;
          font-weight: bold;
        }

        .form-control {
          border-radius: 10px;
        }

        .form-label {
          font-weight: bold;
        }

        .form-select {
          border-radius: 10px;
        }

        .shadow-sm {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
