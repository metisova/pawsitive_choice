import React from 'react';
import { useState } from 'react';
import { useZxing } from 'react-zxing';

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
      <video ref={ref} width={600} height={600} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
