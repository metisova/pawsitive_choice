import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import DB from '../../db.json';
import { BarcodeScanner } from '../BarcodeScanner';

export const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [brandTitle, setBrandTitle] = useState('');
  const [error, setError] = useState(null);

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

  return (
    <div>
      <label htmlFor="barcodeInput">Enter Barcode number: </label>
      <input
        type="text"
        id="barcodeInput"
        value={barcode}
        onChange={handleBarcodeChange}
      />
      <button onClick={handleButtonClick}>Submit</button>

      {error && <p>{error}</p>}
      {brand && (
        <p>
          Brand: {brandTitle} <br /> Country: {brand.country}
          <br /> Cruelty Free: {brand.crueltyFree ? 'Yes' : 'No'} <br />{' '}
          <a href={brand.url}>Find out more</a>
        </p>
      )}
      <div className="video">
        <BarcodeScanner />
      </div>
    </div>
  );
};
