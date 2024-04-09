const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const app = express();

const dbString = 'mongodb+srv://dewaldfourie0808:phBznJoGbwe7LE95@cluster0.jiegnyo.mongodb.net/?retryWrites=true&w=majority';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connection = mongoose.createConnection(dbString, dbOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
    mongoUrl: dbString,
    mongooseConnection: connection,
    collection: 'sessions',
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // equals 1 day (1000ms * 60s * 60min * 24hr)
    }
}));

app.get('/', (req, res, next) => {
    
    if (req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }

    res.send(`<h1>You have visited this page ${req.session.viewCount} times</h1>`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
