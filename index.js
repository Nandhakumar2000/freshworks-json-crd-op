import {
    db
} from './object-db.mjs';


//Creating DB Instance
let dataStore = new db()
// Starting DB
const startPromise = new Promise(async (resolve, reject) => {
    await dataStore.start(process.argv[2])
        .then((resp) => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        })
});

//Create fields
let sample_create = {
    "1": {
        title: 'A'
    },
    "2": {
        title: 'B'
    },
    "3": {
        title: 'C'
    },
    "4": {
        title: 'D'
    },
    "5": {
        title: 'E'
    }
}

//Read Keys
let sample_read = ['1', '2', '3', '4', '5']

// Delete keys
let sample_delete = ['1', '3', '5']

//Starting CRD OP
startPromise.then(async (res) => {

    for (let each in sample_create) {  
        dataStore.create(each, sample_create[each]).then((res) => {}).catch((error) => {})       //---CREATE---
    }
    for (let each in sample_read) {
        dataStore.read(sample_read[each]).then((res) => {}).catch((error) => {})                 //---READ---
    }
    for (let each in sample_delete) {
        dataStore.delete(sample_delete[each]).then((res) => {}).catch((error) => {})             //---DELETE---
    } 
    for (let each in sample_read) {
        dataStore.read(sample_read[each]).then((res) => {}).catch((error) => {})                 //---READ after DELETE---
    }

})
.catch((error)=>{})
