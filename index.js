const express = require("express");
const app = express ();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use("/static",express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, () => {
console.log("Connected to db!");

app.listen(3000, () => console.log("Server running"));
});

app.set("view engine", "ejs");

// GET METHOD
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    });
    });
// app.post('/',(req, res) => {
//         console.log(req.body);
// });    

//POST METHOD
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });
    

    // fetch()  // 
    // .then(response => response.json())
    // .then(data => {
    //
    //   console.log(data);
    // })
    // .catch(error => {
    //  
    //   console.error(error);
    // });