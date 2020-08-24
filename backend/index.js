require('dotenv').config()
const express = require("express");
const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const RoutesUser = require('./routes/User')

// require('./config/passport');

let allowedOrigins = ["http://localhost:3000"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            let mes = "can not access";
            return callback(new Error(mes), false);
        }

        return callback(null, true);
    }
}));

app.use(fileUpload());
app.use(express.static('./images'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users',RoutesUser)


db.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });
});
