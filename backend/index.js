require("dotenv").config();
const express = require("express");
const app = express();

// db.sequelize.sync({ force:false})
// .then(() => {
  app.listen(process.env.PORT,
    () => {
      console.log(`server is running at port:${process.env.PORT}`);
    });
// }).catch(err => console.log(err.message));
