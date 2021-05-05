const express = require('express');
const colors = require('colors');
const path = require('path');
const app = express();

//***To use req.body in POST routes we need these middlewares***
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

//***Template***
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//***Static Files***
app.use(express.static(path.join(__dirname, '/public')));

//***Routes***
app.get('/', (req, res) => {
	res.render('home');
});

app.get('/hello', (req, res) => {
	res.send('Hello Page!');
});

app.get('/apiroute', (req, res) => {
	res.send({ color: 'red' })
})

app.get('/r/:subreddit', (req, res) => {
	const { subreddit } = req.params;
	res.send(`<h1>This is a <em>${subreddit}</em> subreddit</h1>`)
})

app.get('/search', (req, res) => {
	const { q } = req.query;
	res.send(`Search results for: ${q}`)
})

app.get('*', (req, res) => {
	res.send("404 Page not found!")
})

//***Listener****
app.listen(3000, () => {
	console.log('Listening on PORT 3000'.white);
});
