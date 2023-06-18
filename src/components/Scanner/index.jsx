import React, { useState, useContext, useEffect } from 'react';
import DB from '../../db.json';
import './style.css';
import { ThemeContext } from '../context';
import { ScannerContainer } from '../ScannerContainer';

export const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [brandTitle, setBrandTitle] = useState('');
  const [error, setError] = useState('');
  const [scanner, setScanner] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const brand = DB[brandTitle];

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const productFetch = (barcode) => {
    if (barcode.length <= 0 || barcode.length >= 14) {
      setBrandTitle('');
      setError(
        'Wrong barcode format. Please check the lenght of your barcode.',
      );
      return;
    }

    const fetchData = async (url, { barcode }) => {
      const params = new URLSearchParams({ barcode });
      const response = await fetch(url + '?' + params);
      setHasFetched(true);
      return response;
    };

    fetchData(`https://pawsitive-choice-test.vercel.app/api/lookup`, {
      barcode,
    })
      .then((response) => response.json())
      .then((data) => {
        const product = data.products[0];

        if (!product.brand) {
          throw new Error('Unknown brand');
        }

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

  useEffect(() => {
    if (!brand && hasFetched ) {
      setError(
        `Product or brand is not found. It is possible that we don't have it in our database... yet.`,
      );
    }
  }, [brandTitle]);

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
    productFetch(result);
    closeScanner();
  };

  const openLink = () => {
    window.open(brand.url, '_blank');
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
        <br /> Cruelty Free:{' '}
        <span className={brand.crueltyFree ? 'green' : 'red'}>
          {' '}
          {brand.crueltyFree ? 'Yes' : 'No'}{' '}
        </span>
        <br />
        <a className="brand-url" href={brand.url} target="blank">
          <button className="redirect-button" onClick={openLink}>
            Visit company's website
          </button>
        </a>
      </p>
    );
  } else if (error) {
    text = (
      <p>
        Product or brand is not found. It is possible that we don't have it in
        our database... yet.
      </p>
    );
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
