import React from 'react';
import { useState } from 'react';
import { useZxing } from 'react-zxing';
import './style.css';

export const BarcodeScanner = () => {
  const [result, setResult] = useState('');
  const { ref } = useZxing({
    constraints: {
      video: {
        width: { min: 640, ideal: 1920 },
        height: { min: 400, ideal: 1080 },
        aspectRatio: { ideal: 1.7777777778 },
      },
    },
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} className='video'/>
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
