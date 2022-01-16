const express = require("express");

const app = express();

app.get("/",(req, res) => {
  res.send("Thank you my Lord Jesus")
})


const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`Running on port ${port}`))