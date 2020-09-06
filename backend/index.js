require("dotenv").config();
require("./config/passport");

const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const RoutesCustomers = require("./routes/customers");
const RoutesProviders = require("./routes/providers");
const RoutesPets = require("./routes/pets");
const RoutesTasks = require("./routes/tasks");
const RoutesBills = require("./routes/bill")
const RoutesHistories = require("./routes/histories");
const RoutesOptionals = require('./routes/optionals')



let allowedOrigins = ["http://localhost:3000","http://localhost:3002"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        let mes = "can not access";
        return callback(new Error(mes), false);
      }

      return callback(null, true);
    },
  })
);

app.use(fileUpload());
app.use(express.static("./images"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/customers", RoutesCustomers);
app.use("/providers", RoutesProviders);
app.use("/tasks", RoutesTasks);
app.use('/bills',RoutesBills)
app.use("/histories", RoutesHistories);
app.use('/pets', RoutesPets)
app.use('/optionals',RoutesOptionals)



db.sequelize.sync({ force:false}).then(() => {
  app.listen(process.env.PORT, () => {

    console.log(`Server is running at ${process.env.PORT}`);
  });
});
