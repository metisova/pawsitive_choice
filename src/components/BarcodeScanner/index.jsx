import React from 'react';
import { useState } from 'react';
import { useZxing } from 'react-zxing';
import './style.css';

export const BarcodeScanner = ({ paused }) => {
  const [result, setResult] = useState('');
  const { ref } = useZxing({
    paused,
    constraints: {
      video: {
        facingMode: 'environment',
        width: { min: 640, ideal: 1920 },
        height: { min: 400, ideal: 1080 },
        aspectRatio: { ideal: 1.7777777778 },
      },
    },
    onResult(result) {
      setResult(result.getText());
    },
  });

  console.log(result);

  return (
    <>
      <video ref={ref} className="video" />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
