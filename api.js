const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

app.use(express.static('public'));
app.use(express.json())

const port = 3000
const hostName = 'localhost'

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})


//Database
let taskDatabase = []; //will include all typicalEntries


// let typicalEntry = {
//    id: //number for each new entry it will be = Date.now() to have unique IDs
//    action: //plain text of the task
//    status: //automatically set to TODO but with further action (PUT) could be modify
//}

//TODO : 
    //Get /tasks => display all task entry in taskDatabase
    //Post /tasks => create typicalEntry with the correct data to assign to each property of the typical object entry and push it to taskDatabase
    //Delete /tasks => remove typicalEntry from the taskDatabase

//TODO : at some point use JSON or to stringify ?

//TODO : add verification to ensure that id comparaison is on the same format (two numbers)


// '/tasks/' endpoint
app.route('/tasks')
    .get((req, res) => { //access all tasks
        if (taskDatabase) {
            taskDatabase = fs.readFile(('public/storage.json').toString().split("\n"), function (err) {if (err) return console.log(err); console.log("Data retrieved")})
            res.send(taskDatabase)
        } res.send("No task yet")
    })

    .post((req, res) => { //create new task
        let newEntry = {
            id: Date.now(),
            action: req.body.action,
            status: "todo"
        }
        taskDatabase.push(newEntry)

        fs.appendFile('public/storage.json', JSON.stringify(taskDatabase[taskDatabase.length-1]), 'utf8', function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log('The data was appended to file!')
          })
        res.redirect('/tasks');
});

// '/tasks/:id' endpoint
app.route('/tasks/:id')
    .get((req, res) => { //access specific tasks
        const task = taskDatabase.filter(element => element.id === parseInt(req.params.id));
         if (!task) return res.status(404).send("The task with the given ID does not exist.");
        else res.sendStatus(task);
    }) 

    .put((req, res) => { //update specific tasks
        let index = taskDatabase.findIndex( element => element.id === parseInt(req.params.id))

        taskDatabase[index].status = req.body.status || taskDatabase[index].status
        taskDatabase[index].action = req.body.action || taskDatabase[index].action
        res.send(`Task ${req.params.id} has been updated`);

    }) 

    .delete((req, res) => { //supress specific tasks
        let index = taskDatabase.findIndex( element => element.id === parseInt(req.params.id))
        taskDatabase.splice(index, 1)
        res.send(`Task ${req.params.id} has been deleted`);
    }); 

    //TODO check later if i can change that
// // /tasks/:status
// app.delete('/tasks/:status', ((req, res) => { // remove all tasks from specific status
//     let filterArray = taskDatabase.filter((element) => {toString(element.status) !== toString(req.params.status)})
//     taskDatabase = filterArray
    
//     // taskDatabase.forEach(function(elem) {
//     //     if(elem.status === req.query.status) {
//     //         taskDatabase.splice(taskDatabase.indexOf(elem), 1);
//     //     }
//     // })    

//     return res.send(`All ${req.params.status} have been removed from the list`);
// })); 