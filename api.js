const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

app.use(express.static('public'));
app.use(express.json())
app.set('view engine', 'ejs')

const port = 3000
const hostName = 'localhost'

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})


//Database
let taskDatabase = []; //will include all typicalEntries
const taskDatabaseJSON = fs.readFileSync('public/storage.json')
const taskJson = JSON.parse(taskDatabaseJSON) // convert in JSON format


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

// '/' endpoint

app.get('/', (req,res) => {
    // res.render('index', { name: "ML" });
})

// '/tasks/' endpoint
app.route('/tasks')
    .get((req, res) => { //access all tasks
        if (taskJson) {
            console.log(taskJson)
            return res.send(taskJson)
        } return res.send("No task yet")
    // res.render('index', { tasksArray: taskDatabase });
    })

    .post((req, res) => { //create new task
        let newEntry = {
            id: Date.now(),
            action: req.body.action,
            status: "todo"
        }
        taskJson.push(newEntry);
        const newData = JSON.stringify(taskJson) //back to row format
        fs.writeFile("public/storage.json", newData, (err) => {
            // Error checking
            if (err) throw err;
            console.log("New data added");
          });
        res.status(200)  
        res.send(`${newEntry.action} added`);
});

// '/tasks/:id' endpoint
app.route('/tasks/:id')
    .get((req, res) => { //access specific tasks
        
        const task = taskJson.filter(element => element.id === parseInt(req.params.id));
         if (!task) return res.status(404).send("The task with the given ID does not exist.");
        else 
        res.sendStatus(task);
    }) 

    .put((req, res) => { //update specific tasks

        let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))

        taskJson[index].status = req.body.status || taskJson[index].status
        taskJson[index].action = req.body.action || taskJson[index].action
        res.send(`Task ${req.params.id} has been updated`);

    }) 

    .delete((req, res) => { //supress specific tasks
        let index = taskJson.findIndex( element => element.id === parseInt(req.params.id))
        taskJson.splice(index, 1)
        res.send(`${taskJson[index].content} has been deleted`);
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