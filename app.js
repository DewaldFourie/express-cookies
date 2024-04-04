const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

// package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

// dewaldfourie0808
// phBznJoGbwe7LE95

// mongodb+srv://dewaldfourie0808:phBznJoGbwe7LE95@cluster0.jiegnyo.mongodb.net/?retryWrites=true&w=majority

// Create the Express App
var app = express();
// <user>:<password>@
const dbString = 'mongodb+srv://dewaldfourie0808:phBznJoGbwe7LE95@cluster0.jiegnyo.mongodb.net/?retryWrites=true&w=majority';
const dbOptions = {
    userNewUrlParser: true,
    useUnifiedTopology: true,
}
const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions',
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // equals 1 day ( 1000ms * 60s * 60min * 24hr)
    }
}));

app.get('/', (req, res. next) => {
    res.send(`<h1>Hello World (sessions)</h1>`);
});

app.listen(3000);
