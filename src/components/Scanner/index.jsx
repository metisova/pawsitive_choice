import React, { useState, useContext, useEffect } from 'react';
import DB from '../../db.json';
import { ThemeContext } from '../context';
import { ScannerContainer } from '../ScannerContainer';

export const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [brandTitle, setBrandTitle] = useState('Garnier');
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
  
  const brand = DB[brandTitle];

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
    <ScannerContainer
      barcode={barcode}
      handleBarcodeChange={handleBarcodeChange}
      handleButtonClick={handleButtonClick}
      openScanner={openScanner}
      closeScanner={closeScanner}
      scanner={scanner}
      darkMode={darkMode}
      text={text}
      handleResult={handleResult}
    />
  );
};
