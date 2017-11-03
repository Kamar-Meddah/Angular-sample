const express = require('express');
const app = express();
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer({ dest: 'img/articles/' }); // for parsing multipart/form-data
const SessionStore = require('express-session-sequelize')(session.Store);
const Sequelize = require('sequelize');
const sequelize = new Sequelize(require('./config/dbconfig'))
sequelize.define('sessions', {
    session_id: { type: Sequelize.STRING, primaryKey: true },
    expires: { type: Sequelize.INTEGER },
    data: { type: Sequelize.TEXT, allowNull: true }
})
app.use(session({
    secret: 'keep it secret, keep it safe.',
    store: new SessionStore({ db: sequelize }),
    resave: true,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.all(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.post('/', upload.array('images'), (req, res) => {
    console.log(req.body)
    const string = req.body.request.split('.')
    const ctrl = require(`./app/controller/${string[0]}Ctrl`);
    const fun = string[1]
    ctrl[fun](req, res)
})

//-------------------------------------------------------------------------
//server port default=80*/
app.listen(80);