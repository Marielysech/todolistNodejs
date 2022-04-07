let taskDatabase = [
{
    id: 1,
    value: 'a',
},
{
    id: 2,
    value: 'b',
},
{
    id: 3,
    value: 'b',
},
{
    id: 4,
    value: 'c',
}]

let test = [1,2,6,4,5,8,9]


// function idAssignation() {
//     if (taskDatabase.length < 1) {
//         return 1
//     } return taskDatabase.length + 1
// }

// let newEntry = {
//     action: 'test',
//     status: "todo"
// }

// newEntry.id = idAssignation()
// taskDatabase.push(newEntry)
// console.log(taskDatabase)

let index = test.findIndex(element => element === 2)
console.log('found index is ' + index)


let arr = [1,2,3,5,4,8,9,6,5,74,9,9,9]
let filterArray = arr.filter(element => element !== parseInt("9"))
arr = filterArray
console.log("this is the new arr" + arr)
console.log("this is the filtred array" + filterArray)
