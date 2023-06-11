import React, { useState, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import DB from '../../db.json';
import { BarcodeScanner } from '../BarcodeScanner';
import './style.css';
import scannerIconWhite from '../../img/qr-code-scan-light.png';
import scannerIconDark from '../../img/qr-code-scan.png';
import { ThemeContext } from '../context';

export const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [brandTitle, setBrandTitle] = useState('');
  const [error, setError] = useState(null);
  const [scanner, setScanner] = useState(false);

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const proxyurl = 'https://cors-anywhere.herokuapp.com/';

  const handleButtonClick = () => {
    fetch(
      proxyurl +
        `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=9jdx75km4av4da5tusc467p5wwzptw`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.products &&
          data.products.length > 0 &&
          data.products.length < 14
        ) {
          const product = data.products[0];
          setBrandTitle(product.brand);
          setError(null);
        } else if (data.products && data.products.length >= 14) {
          setBrandTitle('');
          setError(
            'Wrong barcode format. Please check the lenght of your barcode.',
          );
        } else {
          setBrandTitle('');
          setError('Product is not found.');
        }
      })
      .catch((error) => {
        console.log(error);
        setBrandTitle('');
        setError('Product is not found');
      });

    setBarcode('');
  };

  const brand = DB[brandTitle];

  const openScanner = () => {
    setScanner(true);
  };

  const closeScanner = () => {
    setScanner(false);
  };

  const handleResult = (result) => {
    setBarcode(result)
    closeScanner();
  } 

  const darkMode = useContext(ThemeContext);

  return (
    <div>
      <div className="scanner-container">
        <div className="scanner-container-inputs">
          <button className="open-scanner" onClick={openScanner}>
            Open Scanner
          </button>
          {scanner ? (
            <div className="video-container">
              <button onClick={closeScanner} className="close-video-button">
                X
              </button>
              <div className="video-mid-container">
                <BarcodeScanner paused={!scanner} handleResult={handleResult}/>
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
        <div className="scanner-container-text">  
          {error && <p>{error}</p>}
          {brand ? (
            <p className='brand-info'>
              Brand: {brandTitle} <br /> Country: {brand.country}
              <br /> Cruelty Free: {brand.crueltyFree
                ? 'Yes'
                : 'No'} <br /> <a className='brand-url' href={brand.url} target='blank'>Find out more</a>
            </p>
          ): (<p>
            Use scanner to determine if the brand still carries out animal
            testing for its products
          </p>)}
          
        </div>
      </div>
    </div>
  );
};
