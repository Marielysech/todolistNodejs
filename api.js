const express = require('express')
const app = express()
let ejs = require('ejs');
app.use(express.json())

const port = 3000
const hostName = 'localhost'

app.listen(port, hostName, (err) => {
    if (err) console.log("Something went wrong " + err );
    else console.log(`Server running on port ${port}...`);
})


//Database

let taskDatabase = []; //will include all typicalEntries
let idCounter = 0 // to assign IDs

// let typicalEntry = {
//    id: //number for each new entry it will be = counter +1
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
        if (taskDatabase.length>=1) {
           return res.send(taskDatabase);
        }   return res.send("There is not existing tasks");
    }) 

    .post((req, res) => { //create new task
        let newEntry = {
            id: idCounter+1,
            action: req.body.action,
            status: "todo"
        }

        idCounter = idCounter +1

        taskDatabase.push(newEntry)
        res.redirect('/tasks');
    }); 


// '/tasks/:id' endpoint
app.route('/tasks/:id')
    .get((req, res) => { //access specific tasks
        res.send(taskDatabase.filter(element => element.id === parseInt(req.params.id)));
    }) 

    .put((req, res) => { //update specific tasks
        let index = taskDatabase.findIndex( element => element.id === parseInt(req.params.id))

        //TODO ADD IF STATEMENT REGARDING WHAT WILL BE CHANGED
        taskDatabase[index].status = req.body.status || taskDatabase[index].status
        taskDatabase[index].action = req.body.action || taskDatabase[index].action
        res.send(`Task ${req.params.id} has been updated`);

    }) 

    .delete((req, res) => { //supress specific tasks
        let index = taskDatabase.findIndex( element => element.id === parseInt(req.params.id))
        taskDatabase.splice(index, 1)
        res.send(`Task ${req.params.id} has been deleted`);
    }); 

// /tasks/:status
app.delete('/tasks/:status', (req, res) => { // remove all tasks from specific status
    let filterArray = taskDatabase.filter((element) => {toString(element.status) !== toString(req.params.status)})
    console.log(taskDatabase)
    taskDatabase = filterArray
    console.log(taskDatabase)
    
    // taskDatabase.forEach(function(elem) {
    //     if(elem.status === req.query.status) {
    //         taskDatabase.splice(taskDatabase.indexOf(elem), 1);
    //     }
    // })    

    return res.send(`All ${req.params.status} have been removed from the list`);
}); 

