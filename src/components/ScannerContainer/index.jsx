import React from 'react';
import { BarcodeScanner } from '../BarcodeScanner';
import scannerIconWhite from '../../img/qr-code-scan-light.png';
import scannerIconDark from '../../img/qr-code-scan.png';
import './style.css';

export const ScannerContainer = ({
  barcode,
  handleBarcodeChange,
  handleButtonClick,
  openScanner,
  closeScanner,
  scanner,
  darkMode,
  text,
  handleResult,
}) => {
  return (
    <div>
      <div className="scanner-container">
        <div className="scanner-container-text">{text}</div>
        <div className="scanner-container-inputs">
          <button className="open-scanner" onClick={openScanner}>
            Open Scanner
          </button>
          {scanner ? (
            <div className="video-container">
              <button onClick={closeScanner} className="close-video-button">
                x
              </button>
              <div className="video-mid-container">
                <BarcodeScanner paused={!scanner} handleResult={handleResult} />
              </div>
            </div>
          ) : (
            ''
          )}
          <img
            className="scannerIcon"
            src={darkMode ? scannerIconDark : scannerIconWhite}
            alt="Scanner icon"
          />
          <hr />
          <label className="input-label" htmlFor="barcodeInput">
            Enter Barcode number:{' '}
          </label>
          <input
            className="input"
            type="text"
            id="barcodeInput"
            value={barcode}
            onChange={handleBarcodeChange}
          />
          <button className="submit-button" onClick={handleButtonClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
