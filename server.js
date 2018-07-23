'use strict'

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => res.send('Testing 1, 2, 3'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));