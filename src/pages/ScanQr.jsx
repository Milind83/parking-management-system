import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

function ScanQr() {
  const [scanPoint, setScanPoint] = useState('');
  const [scannedData, setScannedData] = useState(null);
    const [scanning, setScanning] = useState(false);
    const navigate = useNavigate();

  const handleScanPoint = (point) => {
    setScanPoint(point);
    setScanning(true);
    setScannedData(null);
  };

  const handleQrResult = (results) => {
    if (!results || results.length === 0) return;

    const resultText = results[0]?.rawValue;
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, '0');
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      const scanTime = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;

    try {
        const data = JSON.parse(resultText);
        console.log({ ...data, scanPoint },"Scn")
        setScannedData({ ...data, scanPoint, scanTime });
      toast.success('QR scanned successfully!');
    } catch (e) {
        console.error('QR Scan Error:', e);
      toast.error('Invalid QR data');
    }

    setScanning(false);
    setScanPoint('');
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 500 }}>
                    <button className="btn mb-3 p-0 d-flex justify-content-start" onClick={() => navigate('/')}>{"<-"} Back to Home</button>

          <h2 className="text-center mb-4">QR Scanner</h2>

          <div className="d-flex gap-3 justify-content-center mb-4">
            <button
              className="btn btn-success"
              onClick={() => handleScanPoint('Entry')}
              disabled={scanning}
            >
              Entry Point Scan
            </button>

            <button
              className="btn btn-danger"
              onClick={() => handleScanPoint('Exit')}
              disabled={scanning}
            >
              Exit Point Scan
            </button>
          </div>

          {scanning && (
            <div className="mb-3">
              <Scanner
                onScan={handleQrResult}
                onError={(err) => console.error(err)}
                constraints={{ facingMode: 'environment' }}
                components={{
                  audio: true,
                  onOff: true,
                  torch: true,
                  zoom: true,
                  finder: true,
                }}
                styles={{ container: { width: '100%' } }}
              />
              <div className="text-center my-3">
                Scanning... Please show QR to camera.
              </div>
            </div>
          )}

          {scannedData && (
            <div className="alert alert-info mt-3">
              <h5>Scanned Data</h5>
              <ul className="mb-2">
                <li><b>Owner Name:</b> {scannedData.ownerName}</li>
                <li><b>Flat No:</b> {scannedData.flatNo}</li>
                <li><b>Contact:</b> {scannedData.contact}</li>
                <li><b>Email:</b> {scannedData.email}</li>
                <li><b>Vehicle Type:</b> {scannedData.vehicleType}</li>
                  <li><b>Scan Time:</b> {scannedData.scanTime}</li>
              </ul>
              <div>
                <b>Scanning Point:</b>{' '}
                <span
                  className={
                    scannedData.scanPoint === 'Entry'
                      ? 'text-success'
                      : 'text-danger'
                  }
                >
                  {scannedData.scanPoint}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ScanQr;
