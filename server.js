const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const express = require('express')
app = express();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const route= [
    {id: 1, name: "Promise1"},
    {id: 2, name: "Promise2"},
    {id: 3, name: "Promise3"},
]

app.use(express.static("public"))
app.get("/api",(req, res) => {
  res.send("it's working")
})

const port= process.env.PORT || 3000

app.listen(port, () => console.log(`listening on Port ${port}`))
  console.log(`Worker ${process.pid} started`);
}