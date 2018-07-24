'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);

client.connect();
client.on('error', error => {
  console.error(error);
});

app.get('/', (req, res) => res.send('Testing 1, 2, 3'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));