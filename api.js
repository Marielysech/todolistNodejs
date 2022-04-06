const express = require('express')
const app = express()
const path = require('path');
app.use(express.json())

const port = 3000
const hostName = 'localhost'

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})


//Database

let taskDatabase = []; //will include all typicalEntrie

// let typicalEntry = {
//    id: //number for each new entry it will be = array.length
//    action: //plain text of the task
//    status: //automatically set to TODO but with further action (PUT) could be modify
//}

//TODO : 
    //Get /tasks => display all task entry in taskDatabase
    //Post /tasks => create typicalEntry with the correct data to assign to each property of the typical object entry and push it to taskDatabase
    //Delete /tasks => remove typicalEntry from the taskDatabase

//TODO : at some point use JSON or to stringify ?


// '/tasks/' endpoint
app.route('/tasks')
    .get((req, res) => {
        res.send(__dirname + `/index.html`);
        // res.send('here are all the tasks');
    }) //access all tasks

    .post((req, res) => {
        res.send(`create the task ${req.body.name}`);
    }); //create new task


// '/tasks/:id' endpoint
app.route('/tasks/:id')
    .get((req, res) => {
        res.send(`here is the ${req.params.id} task`);
    }) //access specific tasks

    .put((req, res) => {
    res.send(`update the   ${req.params.id} task`);

    }) //update specific tasks

    .delete((req, res) => {
    res.send(`delete the ${req.params.id} task`);
    }); //supress specific tasks


// /tasks/:id/:status
app.put('/tasks/:id/:status', (req, res) => {
    res.send(`modify your ${req.params.id} task status`);

}); // modify status from specific task

// /tasks/:id/:tag
app.put('/tasks/:id/:tag', (req, res) => {
    res.send('modify your task tag');

}); //update tag of a specific task


// /tasks/:status
app.delete('/tasks/:status', (req, res) => {
    res.send('modify your task status');
}); // remove all tasks from specific status
