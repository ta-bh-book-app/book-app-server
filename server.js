'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const pg = require('pg');
const PORT = process.env.PORT;
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);

client.connect();
client.on('error', error => {
  console.error(error);
});

app.use(cors());
app.get('/api/v1/books', (req, res) => {
  let SQL = `
    SELECT book_id, title, author, image_url 
    FROM books;
  `;

  client.query(SQL)
    .then(result => res.send(result.rows))
    .catch(console.error);
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));