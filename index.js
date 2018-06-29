const express = require('express');
const app = express();
const ParseController = require('./controllers/parse.controller');

app.get('/parseUsersSessions', ParseController.parseUsersSessions);

app.use(express.static('public'));

app.listen(5002, () => {
    console.log(`Server listener on 5002 port!
make request to localhost:5002 to see visualization of parsed file`);
});
