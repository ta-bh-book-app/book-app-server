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

// receiving id value (Book.fetchOne)
app.get('/api/v1/books/:id', (request, response) => {
  let SQL = `
    SELECT book_id, title, author, image_url 
    FROM books
    WHERE book_id = $1;`;
  let values = [
    request.body.book_id
  ]

  client.query(SQL, values)
    .then(result => response.send(result.row))
    .catch(console.error);
});

app.get('/api/v1/books', (request, response) => {
  let SQL = `
    SELECT book_id, title, author, image_url 
    FROM books;
  `;

  client.query(SQL)
    .then(result => response.send(result.rows))
    .catch(console.error);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));