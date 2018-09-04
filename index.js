/*const s = require('espression');
console.log(s);
// const { jsepRules, Parser } = require('espression');
const  { RegexRule }  = require('espression/rules');
const rules = jsepRules();
rules[rules.length - 1].push(new RegexRule());

const jsepParser = new Parser(rules);

const jsep = require('jsep');

const r = jsepParser("match('master', '\d+', false) == true");
console.error(JSON.stringify(r, null, 2));
1*/


const express = require('express');
const app = express();
const UsersSessionsController = require('./controllers/users.sessions.controller');
app.get('/parseUsersSessions', UsersSessionsController.getUsersSessions);
console.log('12');
app.use(express.static('public'));
/*error handler for log errors*/
app.use(function (err, req, res, next) {
	console.log(err);
	next(err);
});
/*global error handler middleware, must be last middlewae*/
//
app.use(function (err, req, res, next) {
		/*if the headers are already sent to delegate the error to the default handler*/
		if (res.headersSent) {
			return next(err);
		}

		res.status(500);
		res.json({ error: err });
	}
);

app.listen(5002, () => {
    console.log(`Server listener on 5002 port!
make request to localhost:5002 to see visualization of parsed file`);
})
