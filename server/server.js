const express = require('express');

const PORT = 5000;

const app = express();

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('server online');
})