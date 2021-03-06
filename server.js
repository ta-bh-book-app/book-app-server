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

// TODO: The below query is not returning anything
// receiving id value (Book.fetchOne)
app.get('/api/v1/books/:id', (request, response) => {
  let SQL = `
    SELECT * 
    FROM books
    WHERE book_id = $1;`;
  let values = [
    request.params.id
  ]
  client.query(SQL, values)
    .then(result => response.send(result.rows))
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

app.post('/api/v1/books', express.urlencoded(), (request, response) => {
  let {title, author, isbn, image_url, description} = request.body;

  let SQL = `INSERT INTO books(title, author, isbn, image_url, description) 
             VALUES($1, $2, $3, $4, $5);`;

  let values = [title, author, isbn, image_url, description];

  client.query(SQL, values)
      // Brandon - added '() => '
      .then(() => response.sendStatus(201))
      .catch(console.error);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));