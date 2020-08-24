require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const passport = require("passport");


let allowdOrgins = ["http://localhost:3000"];

const userRoutes = require("./routes/user");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowdOrgins.indexOf(origin) === -1) {
        let mes = "you can not access";
        return callback(new Error(mes), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);

// db.sequelize.sync({ force:false})
// .then(() => {
app.listen(process.env.PORT, () => {
  console.log(`server is running at port:${process.env.PORT}`);
});
// }).catch(err => console.log(err.message));
