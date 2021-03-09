const express = require('express');
const app = express();

const { quotes } = require('./data');

const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Request format: GET /api/quotes?person=Person Name
app.get('/api/quotes', (req, res, next) => {
    const author = req.query.person;
    if (author) {
        const quotesByAuthor = [];
        for (let i = 0; i < quotes.length; i++) {
            // allows for searching by first or last name only
            if (quotes[i].person.includes(author)) {
                quotesByAuthor.push(quotes[i]);
            }
        }
        res.send(
            {quotes: quotesByAuthor}
        );
    }
    else {
        res.send(
            {quotes: quotes}
        );
    }
});

// Request format: POST /api/quotes?quote=Quote text here&person=Person Name
app.post('/api/quotes', (req, res, next) => {
    const quote = req.query.quote;
    const author = req.query.person;
    if (quote && author) {
        const newQuote = {
            person: author,
            quote: quote
        };
        quotes.push(newQuote);
        res.send(
            {quote: newQuote}
        );
    } else {
        res.status(400).send();
    }
});

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuoteObj = getRandomElement(quotes);
    res.send(
        {quote: randomQuoteObj}
    );
});

app.listen(PORT, () => {
    console.log('Server now listening.');
});