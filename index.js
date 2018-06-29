const express = require('express');
const app = express();
const UsersSessionsController = require('./controllers/users.sessions.controller');

app.get('/parseUsersSessions', UsersSessionsController.getUsersSessions);

app.use(express.static('public'));

app.listen(5002, () => {
    console.log(`Server listener on 5002 port!
make request to localhost:5002 to see visualization of parsed file`);
});
