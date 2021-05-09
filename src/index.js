const express = require("express");
require("./db/mongoose");

const catagoriesRouter = require("./routers/catagories");
const usersRouter = require("./routers/users");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const path = require("path");

app.use(cors());

// app.use((req, res, next) => {
//     res.status(503).send('the site is under maintenance')
// })

app.use(express.json());
//app.use(express.static('public'))
// app.use('/users', usersRouter)
// app.use('/catagories',catagoriesRouter);
app.use(catagoriesRouter, usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("server is up in port " + port);
});
