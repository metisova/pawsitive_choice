import React, { useState, useContext, useEffect } from 'react';
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

  const productFetch = (barcode) => {
    if (barcode.length <= 0 || barcode.lenght >= 14) {
      setBrandTitle('');
      setError(
        'Wrong barcode format. Please check the lenght of your barcode.',
      );
      return;
    }

    fetch(
      proxyurl +
        `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=ivugajuh3cqsl99hm3cd4txt0ssqpn`,
    )
      .then((response) => response.json())
      .then((data) => {
        const product = data.products[0];
        setBrandTitle(product.brand);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setBrandTitle('');
        setError(
          `Product or brand is not found. It is possible that we don't have it in our database... yet.`,
        );
      });

    setBarcode('');
  };

  useEffect(() => {
    if (barcode && scanner) {
      productFetch(barcode);
    }
  }, [barcode]);

  const handleButtonClick = () => {
    productFetch(barcode);
  };

  const brand = DB[brandTitle];

  const openScanner = () => {
    setScanner(true);
  };

  const closeScanner = () => {
    setScanner(false);
  };

  const handleResult = (result) => {
    setBarcode(result);
    closeScanner();
  };

  const darkMode = useContext(ThemeContext);

  let text = (
    <p>
      Use scanner to determine if the brand still carries out animal testing for
      its products
    </p>
  );

  if (brand) {
    text = (
      <p className="brand-info">
        Brand: {brandTitle} <br /> Country: {brand.country}
        <br /> Cruelty Free: {brand.crueltyFree ? 'Yes' : 'No'} <br />{' '}
        <a className="brand-url" href={brand.url} target="blank">
          Find out more
        </a>
      </p>
    );
  } else if (error) {
    text = <p>{error}</p>;
  }

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
                X
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
