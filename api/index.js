const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.API_KEY;
console.log(apiKey);

app.use(cors());

app.get('/api/lookup', async (req, res) => {
    try {
      console.log({ req });
        const { barcode } = req.query;
      const response = await axios.get(`https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=${apiKey}`);
  
      console.log({ response })
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
