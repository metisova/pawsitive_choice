import React from 'react';
import { useState } from 'react';
import { useZxing } from 'react-zxing';
import './style.css';

export const BarcodeScanner = ({ paused, handleResult }) => {
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
      handleResult(result.getText());
    },
  });

  return (
      <video ref={ref} className="video" />
  );
};
