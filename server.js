const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());

// DB & DB CONNECTION
const mongoDBURL =
  "mongodb://admin:admin@cluster0-shard-00-00-kpcpj.gcp.mongodb.net:27017,cluster0-shard-00-01-kpcpj.gcp.mongodb.net:27017,cluster0-shard-00-02-kpcpj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(err => {
    console.log("Database connection error");
  });

// MODEL
const todoSchema = new mongoose.Schema({
  name: String,
  isComplete: Boolean
});

let Todo = mongoose.model("Todo", todoSchema);

// ROUTERS
app.get("/api/v1/todoList", (req, res) => {
  Todo.find({})
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.send(err);
      console.error(err);
    });
});

app.get("/api/v1/todo/:id", (req, res) => {
  Todo.findById(req.params.id, function(err, data) {
    if (err) {
      res.send(err);
      console.error(err);
    }
    res.send(data);
    console.log(data);
  });
});

app.put("/api/v1/todo/update", (req, res) => {
  Todo.findByIdAndUpdate(req.body._id, req.body, function(err, data) {
    if (err) {
      res.send(err);
      console.error(err);
    }
    res.send(data);
    console.log(data);
  });
});

app.delete("/api/v1/todo/delete/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) {
      res.send(err);
      console.error(err);
    }

    res.send(data);
    console.log(data);
  });
});

app.post("/api/v1/todo", (request, response) => {
  const newToDo = new Todo(request.body);
  newToDo
    .save()
    .then(data => {
      console.log(data);
      response.send(data);
    })
    .catch(err => {
      console.error(err);
      response.send(err);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`listening to port ${port}...`);
});
