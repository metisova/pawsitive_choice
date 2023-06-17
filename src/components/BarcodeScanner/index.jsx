import React from 'react';
import { useZxing, DecodeHintType } from 'react-zxing';
import './style.css';

const hints = new Map();
hints.set(DecodeHintType.TRY_HARDER, true);

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
    hints,
    onResult(result) {
      handleResult(result.getText());
    },
    onDecodeStart() {
      onCameraAccess(); // Call the onCameraAccess function when decoding starts
      },
  });

  return <video ref={ref} className="video" />;
};
