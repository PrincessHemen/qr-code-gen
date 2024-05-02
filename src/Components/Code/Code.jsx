import React, { useRef, useState } from 'react';
import './Code.css';

const Code = () => {
  const qrText = useRef(null);
  const [qrImageUrl, setQrImageUrl] = useState('');

  const generateQRCode = async () => {
    const text = qrText.current.value;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      const imageDataUrl = await response.blob();
      setQrImageUrl(URL.createObjectURL(imageDataUrl));
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className='hero'>
      <div className="container">
        <p>Enter your Text or URL to convert</p>
        <input type="text" name="" id="QRtext" placeholder='Text or URL here...' ref={qrText} />
        <button className='btn' onClick={generateQRCode}>Generate QR Code</button>
        {qrImageUrl && (
          <div className="imgBox">
            <img src={qrImageUrl} alt="generated QR code" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Code;
